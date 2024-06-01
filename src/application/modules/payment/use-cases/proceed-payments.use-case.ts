import {ICommandBus} from '@nestjs/cqrs';
import {ProceedPaymentsCommand} from 'application/modules/payment/commands';

export class ProceedPaymentsUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  async proceed(paymentIds: string[]): Promise<void> {
    await this.commandBus.execute(new ProceedPaymentsCommand(paymentIds));
  }
}
