import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import {SaveSettingsUseCase} from "application/modules/settings/use-cases/save-settings.use-case";

@Injectable()
export class SettingsUseCasesFactory {
  constructor(private readonly commandBus: CommandBus) {}

  createSaveSettingsUseCase(): SaveSettingsUseCase {
    return new SaveSettingsUseCase(this.commandBus);
  }
}
