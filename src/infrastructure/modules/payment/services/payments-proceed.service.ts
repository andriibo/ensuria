import {Inject, Injectable} from '@nestjs/common';
import {StatusEnum} from "domain/enums";
import {IClientRepository, ISettingsRepository} from "domain/repositories";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {PaymentHistoryModel, PaymentModel} from "infrastructure/modules/payment/models";
import {PaymentEntity, SettingsEntity} from "domain/entities";
import {AmountBlockedCalculator, CommissionCalculator} from "domain/calculators";
import {ClientModel} from "infrastructure/modules/client/models";
import {IPaymentsProceedService} from "application/modules/payment/services";
import {NotFoundError} from "application/errors";

@Injectable()
export class PaymentsProceedService implements IPaymentsProceedService {
  constructor(
      @Inject(IClientRepository) private readonly clientRepository: IClientRepository,
      @Inject(ISettingsRepository) private readonly settingsRepository: ISettingsRepository,
      private readonly commissionCalculator: CommissionCalculator,
      private readonly amountBlockedCalculator: AmountBlockedCalculator,
      @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async proceed(payments: PaymentEntity[]): Promise<void> {
    const settings = await this.settingsRepository.findOne();
    if (!settings) {
      throw new NotFoundError('Settings not found.');
    }

    for await (const payment of payments) {
      await this.proceedPayment(payment, settings);
    }
  }

  async proceedPayment(payment: PaymentEntity, settings: SettingsEntity): Promise<void> {
    const shop = payment.shop;
    const client = await this.clientRepository.findByShopId(shop.id);
    if (!client) {
      throw new NotFoundError('Client not found.');
    }
    const paymentCommission = this.commissionCalculator.calculatePaymentCommission(settings.commissionA, settings.commissionB, payment.amount);
    const myCommission = this.commissionCalculator.calculateMyCommission(shop.commissionC, payment.amount);
    const amountBlocked = this.amountBlockedCalculator.calculateAmountBlocked(settings.blockingD, payment.amount);
    const amountHistory = payment.amount - paymentCommission - myCommission - amountBlocked;
    const paymentId = payment.id;
    const status = StatusEnum.Proceed;

    await this.dataSource.transaction(async (entityManager) => {
      await entityManager.insert(PaymentHistoryModel, {
        paymentId,
        amount: amountHistory,
        amountBlocked,
        status
      });
      await entityManager.update(PaymentModel, {id: paymentId}, {status});

      const balance = client.balance + amountHistory;
      await entityManager.update(ClientModel, {id: client.id}, {balance});
    });
  }
}
