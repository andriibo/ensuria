import { Inject, Injectable } from '@nestjs/common';
import {IPaymentRepository} from 'domain/repositories';
import {PaymentEntity} from "domain/entities";
import {IPaymentService} from "application/modules/payment/services";
import {PaymentHistoryModel, PaymentModel} from "infrastructure/modules/payment/models";
import {DataSource} from "typeorm";
import {InjectDataSource} from "@nestjs/typeorm";

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject(IPaymentRepository)
    protected readonly paymentRepository: IPaymentRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(shopId: string, amount: number): Promise<PaymentEntity> {
    return await this.dataSource.transaction(async (entityManager) => {
      const paymentModel = entityManager.create(PaymentModel, {shopId, amount});
      const payment = await entityManager.save(paymentModel);
      const paymentHistoryModel = entityManager.create(PaymentHistoryModel, {
        paymentId: payment.id,
        amount
      });

      await entityManager.save(paymentHistoryModel);

      return payment;
    });
  }
}
