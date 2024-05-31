import {ShopEntity} from 'domain/entities';

export interface IShopRepository {
  findById(id: string): Promise<ShopEntity | null>;
  findByName(name: string): Promise<ShopEntity | null>;
  save(entity: ShopEntity): Promise<ShopEntity>;
}

export const IShopRepository = Symbol('IShopRepository');
