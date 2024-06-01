import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {PaymentsProceedCommand} from "application/modules/payment/commands";
import {IPaymentsProceedService} from "application/modules/payment/services";

@CommandHandler(PaymentsProceedCommand)
export class PaymentsProceedHandler
  implements ICommandHandler<PaymentsProceedCommand>
{
  constructor(
      @Inject(IPaymentsProceedService) private readonly paymentsProceedService: IPaymentsProceedService,
  ) {}

  async execute(command: PaymentsProceedCommand): Promise<void> {
    const { paymentIds } = command;

    await this.paymentsProceedService.proceed(paymentIds);
  }
}
