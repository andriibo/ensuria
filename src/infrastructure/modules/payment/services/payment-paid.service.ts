import {Inject, Injectable} from '@nestjs/common';
import {PaymentEntity} from "domain/entities";
import {IPaymentPaidService} from "application/modules/payment/services";
import {StatusEnum} from "domain/enums";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {PaymentHistoryModel, PaymentModel} from "infrastructure/modules/payment/models";
import {NotFoundError} from "application/errors";
import {ShopModel} from "infrastructure/modules/shop/models";
import {IClientRepository, IShopRepository} from "domain/repositories";
import {ClientModel} from "infrastructure/modules/client/models";

@Injectable()
export class PaymentPaidService implements IPaymentPaidService {
  constructor(
      @Inject(IClientRepository) private readonly clientRepository: IClientRepository,
      @Inject(IShopRepository) private readonly shopRepository: IShopRepository,
      @InjectDataSource() private readonly dataSource: DataSource
  ) {}

  async pay(payment: PaymentEntity): Promise<number | undefined> {
    const paymentDone = payment.paymentHistory.find(history => history.status === StatusEnum.Done);
    if (!paymentDone) {
      throw new NotFoundError('PaymentHistory not found.');
    }

    const client = await this.clientRepository.findByShopId(payment.shopId);
    if (!client) {
      throw new NotFoundError('Client not found.');
    }

    if (client.balance < paymentDone.amount) {
      return;
    }

    const shop = await this.shopRepository.findById(payment.shopId);
    if (!shop) {
      throw new NotFoundError('Shop not found.');
    }

    const status = StatusEnum.Paid;
    const paymentId = payment.id;

    return await this.dataSource.transaction(async (entityManager) => {
      await entityManager.insert(PaymentHistoryModel, {
        paymentId,
        amount: paymentDone.amount,
        status
      });
      await entityManager.update(PaymentModel, {id: paymentId}, {status});
      const shopBalance = shop.balance + paymentDone.amount;
      await entityManager.update(ShopModel, {id: shop.id}, {balance: shopBalance});

      const clientBalance = client.balance - paymentDone.amount;
      await entityManager.update(ClientModel, {id: client.id}, {balance: clientBalance});

      return paymentDone.amount;
    });
  }
}
