import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {SaveSettingsCommand} from "application/modules/settings/commands";
import {ISettingsService} from "application/modules/settings/services";

@CommandHandler(SaveSettingsCommand)
export class SaveSettingsHandler
  implements ICommandHandler<SaveSettingsCommand>
{
  constructor(@Inject(ISettingsService) private readonly settingsService: ISettingsService) {}

  async execute(command: SaveSettingsCommand): Promise<void> {
    const { commissionA, commissionB, blockingD } = command;

    await this.settingsService.save(commissionA, commissionB, blockingD);
  }
}
