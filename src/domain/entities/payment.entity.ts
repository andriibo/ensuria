import {StatusEnum} from "domain/enums";
import {ShopEntity} from "domain/entities";
import {PaymentHistoryEntity} from "domain/entities";

export interface PaymentEntity {
  id: string;
  shopId: string;
  amount: number;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
  shop: ShopEntity;
  paymentHistory: PaymentHistoryEntity[]
}
