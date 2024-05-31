import {SettingsEntity} from 'domain/entities';

export interface ISettingsService {
  save(commissionA: number, commissionB: number, blockingD: number): Promise<SettingsEntity>;
}

export const ISettingsService = Symbol('ISettingsService');
