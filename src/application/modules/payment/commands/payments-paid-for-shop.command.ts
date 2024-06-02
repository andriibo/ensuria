import { ICommand } from '@nestjs/cqrs';

export class PaymentsPaidForShopCommand implements ICommand {
  constructor(readonly shopId: string) {}
}
