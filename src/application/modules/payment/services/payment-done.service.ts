import {PaymentEntity} from "domain/entities";

export interface IPaymentDoneService {
  do(payment: PaymentEntity): Promise<void>;
}

export const IPaymentDoneService = Symbol('IPaymentDoneService');
