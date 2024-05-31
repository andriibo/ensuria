import {ICommandBus} from '@nestjs/cqrs';
import {SaveSettingsCommand} from "application/modules/settings/commands";
import {SettingsRequestDto} from "domain/dto/requests/settings";

export class SaveSettingsUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  async save(dto: SettingsRequestDto): Promise<void> {
    await this.commandBus.execute(new SaveSettingsCommand(dto.commissionA, dto.commissionB, dto.blockingD));
  }
}
