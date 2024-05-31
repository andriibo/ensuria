import { ICommand } from '@nestjs/cqrs';

export class SaveSettingsCommand implements ICommand {
  constructor(
    readonly commissionA: number,
    readonly commissionB: number,
    readonly blockingD: number,
  ) {}
}
