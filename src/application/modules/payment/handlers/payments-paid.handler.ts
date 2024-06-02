import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {PaymentsPaidCommand} from "application/modules/payment/commands";
import {IPaymentRepository} from "domain/repositories";
import {IPaymentPaidService} from "application/modules/payment/services";

@CommandHandler(PaymentsPaidCommand)
export class PaymentsPaidHandler
  implements ICommandHandler<PaymentsPaidCommand>
{
  constructor(
      @Inject(IPaymentRepository) private readonly paymentRepository: IPaymentRepository,
      @Inject(IPaymentPaidService) private readonly paymentPaidService: IPaymentPaidService,
  ) {}

  async execute(command: PaymentsPaidCommand): Promise<void> {
    const payments = await this.paymentRepository.findProceedAndDone();

    if (!payments.length) {
      return;
    }

    for await (const payment of payments) {
      await this.paymentPaidService.pay(payment);
    }
  }
}
