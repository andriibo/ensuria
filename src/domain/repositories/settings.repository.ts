import {SettingsEntity} from 'domain/entities';

export interface ISettingsRepository {
  findOne(): Promise<SettingsEntity | null>;
  save(entity: SettingsEntity): Promise<SettingsEntity>;
}

export const ISettingsRepository = Symbol('ISettingsRepository');
