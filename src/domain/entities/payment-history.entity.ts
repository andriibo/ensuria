import {StatusEnum} from "domain/enums";
import {PaymentEntity} from "domain/entities";

export interface PaymentHistoryEntity {
  id: string;
  paymentId: string;
  amount: number;
  amountBlocked: number;
  status: StatusEnum;
  createdAt: Date;
  payment: PaymentEntity;
}
