import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {PaymentUseCasesFactory} from "infrastructure/modules/payment/factories";

@Injectable()
export class PaymentsPaidJob {
  constructor(private readonly paymentUseCasesFactory: PaymentUseCasesFactory) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async pay(): Promise<void> {
    const useCase = this.paymentUseCasesFactory.createPaymentsPaidUseCase();
    try {
      await useCase.pay();
    } catch (error) {
      console.log(error.message);
    }
  }
}
