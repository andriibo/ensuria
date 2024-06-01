import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import {CreatePaymentUseCase, ProceedPaymentsUseCase} from "application/modules/payment/use-cases";

@Injectable()
export class PaymentUseCasesFactory {
  constructor(private readonly commandBus: CommandBus) {}

  createAddPaymentUseCase(): CreatePaymentUseCase {
    return new CreatePaymentUseCase(this.commandBus);
  }

  createProceedPaymentsUseCase(): ProceedPaymentsUseCase {
    return new ProceedPaymentsUseCase(this.commandBus);
  }
}
