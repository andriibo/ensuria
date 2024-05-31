import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {IShopRepository} from 'domain/repositories';
import {ShopEntity} from "domain/entities";
import {ShopModel} from "infrastructure/modules/shop/models";

@Injectable()
export class ShopRepository implements IShopRepository {
  constructor(
    @InjectRepository(ShopModel)
    private readonly repository: Repository<ShopModel>,
  ) {}

  async findByName(name: string): Promise<ShopEntity | null> {
    return await this.repository.findOneBy({name});
  }

  async save(entity: ShopModel): Promise<ShopEntity> {
    return await this.repository.save(entity);
  }
}
