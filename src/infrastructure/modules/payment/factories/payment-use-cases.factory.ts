import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import {CreatePaymentUseCase} from "application/modules/payment/use-cases";

@Injectable()
export class PaymentUseCasesFactory {
  constructor(private readonly commandBus: CommandBus) {}

  createAddPaymentUseCase(): CreatePaymentUseCase {
    return new CreatePaymentUseCase(this.commandBus);
  }
}
