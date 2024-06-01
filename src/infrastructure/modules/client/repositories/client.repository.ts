import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ClientEntity} from "domain/entities";
import {ClientModel} from "infrastructure/modules/client/models";
import {IClientRepository} from "domain/repositories";

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(ClientModel)
    private readonly repository: Repository<ClientModel>,
  ) {}

  async findByShopId(shopId: string): Promise<ClientEntity | null> {
    return await this.repository.findOneBy({shopId});
  }

  async save(entity: ClientModel): Promise<ClientEntity> {
    return await this.repository.save(entity);
  }
}
