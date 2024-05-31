import {ShopEntity} from 'domain/entities';

export interface IShopRepository {
  findByName(name: string): Promise<ShopEntity | null>;
  save(entity: ShopEntity): Promise<ShopEntity>;
}

export const IShopRepository = Symbol('IShopRepository');
