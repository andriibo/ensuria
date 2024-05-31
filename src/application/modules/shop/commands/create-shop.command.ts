import { ICommand } from '@nestjs/cqrs';

export class CreateShopCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly commissionC: number,
  ) {}
}
