import {Inject, Injectable} from '@nestjs/common';
import {IPaymentRepository, IShopRepository} from "domain/repositories";
import {PaymentEntity, PaymentHistoryEntity, ShopEntity} from "domain/entities";
import {IPaymentsPaidService} from "application/modules/payment/services";
import {StatusEnum} from "domain/enums";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {PaymentHistoryModel} from "infrastructure/modules/payment/models";
import {NotFoundError} from "application/errors";
import {PaymentResponseDto, PaymentsPaidResponseDto} from "domain/dto/responses/payment";

@Injectable()
export class PaymentsPaidService implements IPaymentsPaidService {
  constructor(
      @Inject(IPaymentRepository) private readonly paymentRepository: IPaymentRepository,
      @Inject(IShopRepository) private readonly shopRepository: IShopRepository,
      @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async paid(shopId: string): Promise<PaymentsPaidResponseDto> {
    const shop = await this.shopRepository.findById(shopId);
    if (!shop) {
      throw new NotFoundError('Shop not found.');
    }

    const payments = await this.paymentRepository.findDoneByShopId(shopId);
    if (!payments.length) {
      return;
    }

    const response = new PaymentsPaidResponseDto();
    for await (const payment of payments) {
      const paymentHistory = await this.paidPayment(payment, shop);
      const amount = Number(paymentHistory.amount);
      response.totalAmount += amount;
      response.payments.push(new PaymentResponseDto(payment.id, amount))
    }

    return response;
  }

  private async paidPayment(payment: PaymentEntity, shop: ShopEntity): Promise<PaymentHistoryEntity> {
    const paymentDone = payment.paymentHistory.find(history => history.status === StatusEnum.Done);
    if (!paymentDone) {
      return;
    }

    const status = StatusEnum.Paid;
    const paymentId = payment.id;

    return await this.dataSource.transaction(async (entityManager) => {
      const paymentHistoryModel = entityManager.create(PaymentHistoryModel, {
        paymentId,
        amount: paymentDone.amount,
        status
      });
      payment.paymentHistory.push(paymentHistoryModel);
      const paymentHistoryPaid = await entityManager.save(paymentHistoryModel);

      payment.status = status;
      await entityManager.save(payment);

      shop.balance = Number(shop.balance) + Number(paymentDone.amount);
      await entityManager.save(shop);

      return paymentHistoryPaid;
    });
  }
}
