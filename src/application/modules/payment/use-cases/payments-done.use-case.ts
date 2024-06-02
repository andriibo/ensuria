import {ICommandBus} from '@nestjs/cqrs';
import {PaymentsDoneCommand} from 'application/modules/payment/commands';

export class PaymentsDoneUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  async do(paymentIds: string[]): Promise<void> {
    await this.commandBus.execute(new PaymentsDoneCommand(paymentIds));
  }
}
