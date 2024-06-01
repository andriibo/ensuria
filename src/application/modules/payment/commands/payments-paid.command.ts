import { ICommand } from '@nestjs/cqrs';

export class PaymentsPaidCommand implements ICommand {
  constructor(readonly shopId: string) {}
}
