import {Inject, Injectable} from '@nestjs/common';
import {PaymentEntity} from "domain/entities";
import {IPaymentDoneService} from "application/modules/payment/services";
import {StatusEnum} from "domain/enums";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {PaymentHistoryModel} from "infrastructure/modules/payment/models";
import {NotFoundError} from "application/errors";
import {IClientRepository} from "domain/repositories";
import {ClientModel} from "infrastructure/modules/client/models";

@Injectable()
export class PaymentDoneService implements IPaymentDoneService {
  constructor(
      @Inject(IClientRepository) private readonly clientRepository: IClientRepository,
      @InjectDataSource() private readonly dataSource: DataSource
  ) {}

  async do(payment: PaymentEntity): Promise<PaymentEntity> {
    const paymentProceed = payment.paymentHistory.find(history => history.status === StatusEnum.Proceed);
    if (!paymentProceed) {
      throw new NotFoundError('PaymentHistory not found.');
    }

    const client = await this.clientRepository.findByShopId(payment.shopId);
    if (!client) {
      throw new NotFoundError('Client not found.');
    }

    const status = StatusEnum.Done;
    const amountHistory = paymentProceed.amount + paymentProceed.amountBlocked;
    const paymentId = payment.id;

    return await this.dataSource.transaction(async (entityManager) => {
      const paymentHistoryModel = entityManager.create(PaymentHistoryModel, {
        paymentId,
        amount: amountHistory,
        amountBlocked: 0,
        status
      });
      const paymentHistory = await entityManager.save(paymentHistoryModel);
      payment.paymentHistory.push(paymentHistory);
      payment.status = status;
      const paymentUpdated = await entityManager.save(payment);

      const balance = client.balance + paymentProceed.amountBlocked;
      await entityManager.update(ClientModel, {id: client.id}, {balance});

      return paymentUpdated;
    });
  }
}
