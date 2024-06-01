import {ICommandBus} from '@nestjs/cqrs';
import {PaymentsProceedCommand} from 'application/modules/payment/commands';

export class PaymentsProceedUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  async proceed(paymentIds: string[]): Promise<void> {
    await this.commandBus.execute(new PaymentsProceedCommand(paymentIds));
  }
}
