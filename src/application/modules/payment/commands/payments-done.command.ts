import { ICommand } from '@nestjs/cqrs';

export class PaymentsDoneCommand implements ICommand {
  constructor(readonly paymentIds: string[]) {}
}
