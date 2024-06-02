import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {PaymentsProceedCommand} from "application/modules/payment/commands";
import {IPaymentsProceedService} from "application/modules/payment/services";
import {IPaymentRepository} from "domain/repositories";

@CommandHandler(PaymentsProceedCommand)
export class PaymentsProceedHandler
  implements ICommandHandler<PaymentsProceedCommand>
{
  constructor(
      @Inject(IPaymentRepository) private readonly paymentRepository: IPaymentRepository,
      @Inject(IPaymentsProceedService) private readonly paymentsProceedService: IPaymentsProceedService,
  ) {}

  async execute(command: PaymentsProceedCommand): Promise<void> {
    const { paymentIds } = command;

    const payments = await this.paymentRepository.findNewByIds(paymentIds);
    if (!payments.length) {
      return;
    }

    await this.paymentsProceedService.proceed(payments);
  }
}
