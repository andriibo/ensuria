import { Inject, Injectable } from '@nestjs/common';
import {ISettingsRepository} from 'domain/repositories';
import {ISettingsService} from "application/modules/settings/services";
import {SettingsEntity} from "domain/entities";
import {SettingsModel} from "infrastructure/modules/settings/models";

@Injectable()
export class SettingsService implements ISettingsService {
  constructor(
    @Inject(ISettingsRepository)
    protected readonly settingsRepository: ISettingsRepository,
  ) {}

  async save(commissionA: number, commissionB: number, blockingD: number): Promise<SettingsEntity> {
    const settings = new SettingsModel();
    const findModel = await this.settingsRepository.findOne();
    if (findModel) {
      settings.id = findModel.id;
    }
    settings.commissionA = commissionA;
    settings.commissionB = commissionB;
    settings.blockingD = blockingD;

    return await this.settingsRepository.save(settings);
  }
}
