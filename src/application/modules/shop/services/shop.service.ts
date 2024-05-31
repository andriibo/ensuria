import {ShopEntity} from 'domain/entities';

export interface IShopService {
  create(name: string, commissionC: number): Promise<ShopEntity>;
}

export const IShopService = Symbol('IShopService');
