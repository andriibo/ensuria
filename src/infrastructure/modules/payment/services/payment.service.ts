import { Inject, Injectable } from '@nestjs/common';
import {IPaymentRepository} from 'domain/repositories';
import {PaymentEntity} from "domain/entities";
import {IPaymentService} from "application/modules/payment/services";
import {PaymentModel} from "infrastructure/modules/payment/models";

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject(IPaymentRepository)
    protected readonly paymentRepository: IPaymentRepository,
  ) {}

  async create(shopId: string, amount: number): Promise<PaymentEntity> {
    const payment = new PaymentModel();
    payment.shopId = shopId;
    payment.amount = amount;

    return await this.paymentRepository.save(payment);
  }
}
