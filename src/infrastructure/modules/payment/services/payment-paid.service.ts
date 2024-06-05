import {Inject, Injectable} from '@nestjs/common';
import {PaymentEntity} from "domain/entities";
import {IPaymentPaidService} from "application/modules/payment/services";
import {StatusEnum} from "domain/enums";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {PaymentHistoryModel, PaymentModel} from "infrastructure/modules/payment/models";
import {NotFoundError} from "application/errors";
import {ShopModel} from "infrastructure/modules/shop/models";
import {IClientRepository} from "domain/repositories";
import {ClientModel} from "infrastructure/modules/client/models";

@Injectable()
export class PaymentPaidService implements IPaymentPaidService {
  constructor(
      @Inject(IClientRepository) private readonly clientRepository: IClientRepository,
      @InjectDataSource() private readonly dataSource: DataSource
  ) {}

  async pay(payment: PaymentEntity): Promise<number | undefined> {
    const paymentHistory = payment.paymentHistory.find(history => history.status === payment.status);
    if (!paymentHistory) {
      throw new NotFoundError('PaymentHistory not found.');
    }

    const client = await this.clientRepository.findByShopId(payment.shopId);
    if (!client) {
      throw new NotFoundError('Client not found.');
    }

    const amountHistoryPaid = (paymentHistory.status === StatusEnum.Proceed)
        ? paymentHistory.amount + paymentHistory.amountBlocked
        : paymentHistory.amount;

    if (client.balance < amountHistoryPaid) {
      return;
    }

    const shop = payment.shop;
    const status = StatusEnum.Paid;
    const paymentId = payment.id;

    return await this.dataSource.transaction(async (entityManager) => {
      await entityManager.insert(PaymentHistoryModel, {
        paymentId,
        amount: amountHistoryPaid,
        status
      });
      await entityManager.update(PaymentModel, {id: paymentId}, {status});
      const shopBalance = shop.balance + amountHistoryPaid;
      await entityManager.update(ShopModel, {id: shop.id}, {balance: shopBalance});

      const clientBalance = client.balance - amountHistoryPaid;
      await entityManager.update(ClientModel, {id: client.id}, {balance: clientBalance});

      return amountHistoryPaid;
    });
  }
}
