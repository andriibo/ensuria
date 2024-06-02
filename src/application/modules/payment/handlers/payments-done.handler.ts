import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {PaymentsDoneCommand} from "application/modules/payment/commands";
import {IPaymentRepository} from "domain/repositories";
import {IPaymentDoneService} from "application/modules/payment/services";

@CommandHandler(PaymentsDoneCommand)
export class PaymentsDoneHandler
  implements ICommandHandler<PaymentsDoneCommand>
{
  constructor(
      @Inject(IPaymentRepository) private readonly paymentRepository: IPaymentRepository,
      @Inject(IPaymentDoneService) private readonly paymentDoneService: IPaymentDoneService,
  ) {}

  async execute(command: PaymentsDoneCommand): Promise<void> {
    const { paymentIds } = command;

    const payments = await this.paymentRepository.findProceedByIds(paymentIds);
    if (!payments.length) {
      return;
    }

    for await (const payment of payments) {
      await this.paymentDoneService.do(payment);
    }
  }
}
