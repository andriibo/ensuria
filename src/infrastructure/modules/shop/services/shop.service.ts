import { Inject, Injectable } from '@nestjs/common';
import {IClientRepository, IShopRepository} from 'domain/repositories';
import {ShopEntity} from "domain/entities";
import {IShopService} from "application/modules/shop/services/shop.service";
import {ShopModel} from "infrastructure/modules/shop/models";
import {ClientModel} from "infrastructure/modules/client/models";

@Injectable()
export class ShopService implements IShopService {
  constructor(
    @Inject(IShopRepository)
    protected readonly shopRepository: IShopRepository,
    @Inject(IClientRepository) private readonly clientRepository: IClientRepository
  ) {}

  async create(name: string, commissionC: number): Promise<ShopEntity> {
    const shopModel = new ShopModel();
    shopModel.name = name;
    shopModel.commissionC = commissionC;

    const shop = await this.shopRepository.save(shopModel);
    const client = new ClientModel();
    client.shopId = shop.id;
    client.balance = 0;

    await this.clientRepository.save(client);

    return shop;
  }
}
