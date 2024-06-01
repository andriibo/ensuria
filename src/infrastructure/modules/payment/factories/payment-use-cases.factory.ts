import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import {CreatePaymentUseCase, PaymentsDoneUseCase, PaymentsProceedUseCase} from "application/modules/payment/use-cases";

@Injectable()
export class PaymentUseCasesFactory {
  constructor(private readonly commandBus: CommandBus) {}

  createAddPaymentUseCase(): CreatePaymentUseCase {
    return new CreatePaymentUseCase(this.commandBus);
  }

  createPaymentsProceedUseCase(): PaymentsProceedUseCase {
    return new PaymentsProceedUseCase(this.commandBus);
  }

  createPaymentsDoneUseCase(): PaymentsDoneUseCase {
    return new PaymentsDoneUseCase(this.commandBus);
  }
}
