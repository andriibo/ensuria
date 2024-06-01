import {Inject, Injectable} from '@nestjs/common';
import {IProceedPaymentsService} from "application/modules/payment/services";
import {NotFoundError} from "application/errors";
import {StatusEnum} from "domain/enums";
import {IClientRepository, IPaymentRepository, ISettingsRepository, IShopRepository} from "domain/repositories";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {PaymentHistoryModel} from "infrastructure/modules/payment/models";
import {ClientEntity, PaymentEntity, SettingsEntity, ShopEntity} from "domain/entities";
import {AmountBlockedCalculator, CommissionCalculator} from "domain/calculators";
import {ClientModel} from "infrastructure/modules/client/models";

@Injectable()
export class ProceedPaymentsService implements IProceedPaymentsService {
  private clients: Map<string, ClientEntity> = new Map();
  private shops: Map<string, ShopEntity> = new Map();

  constructor(
      @Inject(IPaymentRepository) private readonly paymentRepository: IPaymentRepository,
      @Inject(ISettingsRepository) private readonly settingsRepository: ISettingsRepository,
      @Inject(IClientRepository) private readonly clientRepository: IClientRepository,
      @Inject(IShopRepository) private readonly shopRepository: IShopRepository,
      private readonly commissionCalculator: CommissionCalculator,
      private readonly amountBlockedCalculator: AmountBlockedCalculator,
      @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async proceed(paymentIds: string[]): Promise<void> {
    const payments = await this.paymentRepository.findNewByIds(paymentIds);
    if (!payments.length) {
      return;
    }

    const settings = await this.settingsRepository.findOne();
    if (!settings) {
      throw new NotFoundError('Settings not found.');
    }

    for await (const payment of payments) {
      await this.proceedPayment(settings, payment);
    }
  }

  private async proceedPayment(settings: SettingsEntity, payment: PaymentEntity): Promise<void> {
    const shop = await this.getShop(payment.shopId);
    const client = await this.getClient(payment.shopId);
    const paymentCommission = this.commissionCalculator.calculatePaymentCommission(settings.commissionA, settings.commissionB, payment.amount);
    const myCommission = this.commissionCalculator.calculateMyCommission(shop.commissionC, payment.amount);
    const amountBlocked = this.amountBlockedCalculator.calculateAmountBlocked(settings.blockingD, payment.amount);
    const amountHistory = payment.amount - paymentCommission - myCommission - amountBlocked;
    const paymentId = payment.id;
    const status = StatusEnum.Proceed;

    await this.dataSource.transaction(async (entityManager) => {
      const paymentHistoryModel = entityManager.create(PaymentHistoryModel, {
        paymentId,
        amount: amountHistory,
        amountBlocked,
        status
      });
      await entityManager.save(paymentHistoryModel);

      payment.status = status;
      await entityManager.save(payment);

      client.balance = Number(client.balance) + amountHistory;
      const clientUpdated = await entityManager.save(client);

      this.clients.set(client.shopId, clientUpdated);
    });
  }

  private async getClient(shopId: string): Promise<ClientEntity> {
    if (this.clients.has(shopId)) {
      return this.clients.get(shopId);
    } else {
      let client = await this.clientRepository.findByShopId(shopId);
      if (!client) {
        client = new ClientModel();
        client.shopId = shopId;
        client.balance = 0;
      }

      return client;
    }
  }

  private async getShop(shopId: string): Promise<ShopEntity> {
    if (this.shops.has(shopId)) {
      return this.shops.get(shopId);
    } else {
      const shop = await this.shopRepository.findById(shopId);
      this.shops.set(shopId, shop);

      return shop;
    }
  }
}
