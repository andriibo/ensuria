import {ICommandBus} from '@nestjs/cqrs';
import {PaymentsPaidCommand} from 'application/modules/payment/commands';

export class PaymentsPaidUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  async pay(): Promise<void> {
    await this.commandBus.execute(new PaymentsPaidCommand());
  }
}
