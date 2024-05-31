import {StatusEnum} from "domain/enums";
import {ShopEntity} from "domain/entities/shop.entity";

export interface PaymentEntity {
  id: string;
  shopId: string;
  amount: number;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
  shop: ShopEntity;
}
