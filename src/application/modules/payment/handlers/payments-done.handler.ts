import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {PaymentsDoneCommand} from "application/modules/payment/commands";
import {IPaymentsDoneService} from "application/modules/payment/services";

@CommandHandler(PaymentsDoneCommand)
export class PaymentsDoneHandler
  implements ICommandHandler<PaymentsDoneCommand>
{
  constructor(
      @Inject(IPaymentsDoneService) private readonly paymentsDoneService: IPaymentsDoneService,
  ) {}

  async execute(command: PaymentsDoneCommand): Promise<void> {
    const { paymentIds } = command;

    await this.paymentsDoneService.done(paymentIds);
  }
}
