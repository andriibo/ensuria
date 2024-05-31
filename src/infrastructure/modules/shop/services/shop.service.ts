import { Inject, Injectable } from '@nestjs/common';
import {IShopRepository} from 'domain/repositories';
import {ShopEntity} from "domain/entities";
import {IShopService} from "application/modules/shop/services/shop.service";
import {ShopModel} from "infrastructure/modules/shop/models";

@Injectable()
export class ShopService implements IShopService {
  constructor(
    @Inject(IShopRepository)
    protected readonly shopRepository: IShopRepository,
  ) {}

  async create(name: string, commissionC: number): Promise<ShopEntity> {
    const shop = new ShopModel();
    shop.name = name;
    shop.commissionC = commissionC;

    return await this.shopRepository.save(shop);
  }
}
