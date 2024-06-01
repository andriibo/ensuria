import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {ProceedPaymentsCommand} from "application/modules/payment/commands";
import {IProceedPaymentsService} from "application/modules/payment/services";

@CommandHandler(ProceedPaymentsCommand)
export class ProceedPaymentsHandler
  implements ICommandHandler<ProceedPaymentsCommand>
{
  constructor(
      @Inject(IProceedPaymentsService) private readonly proceedPaymentsService: IProceedPaymentsService,
  ) {}

  async execute(command: ProceedPaymentsCommand): Promise<void> {
    const { paymentIds } = command;

    await this.proceedPaymentsService.proceed(paymentIds);
  }
}
