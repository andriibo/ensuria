import { ICommand } from '@nestjs/cqrs';

export class CreatePaymentCommand implements ICommand {
  constructor(
    readonly shopId: string,
    readonly amount: number,
  ) {}
}
