import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ISettingsRepository} from 'domain/repositories';
import {SettingsModel} from "infrastructure/modules/settings/models";
import {SettingsEntity} from "domain/entities";

@Injectable()
export class SettingsRepository implements ISettingsRepository {
  constructor(
    @InjectRepository(SettingsModel)
    private readonly repository: Repository<SettingsModel>,
  ) {}

  async findOne(): Promise<SettingsEntity | null> {
    const items = await this.repository.find({take: 1});

    return items[0] ?? null
  }

  async save(entity: SettingsModel): Promise<SettingsEntity> {
    return await this.repository.save(entity);
  }
}
