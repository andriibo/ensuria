import { ICommand } from '@nestjs/cqrs';

export class PaymentsProceedCommand implements ICommand {
  constructor(readonly paymentIds: string[]) {}
}
