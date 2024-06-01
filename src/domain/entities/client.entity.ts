import {ShopEntity} from "domain/entities/shop.entity";

export interface ClientEntity {
  id: string;
  shopId: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  shop: ShopEntity;
}
