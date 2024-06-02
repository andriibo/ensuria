import {PaymentEntity} from "domain/entities";

export interface IPaymentDoneService {
  do(payment: PaymentEntity): Promise<PaymentEntity>;
}

export const IPaymentDoneService = Symbol('IPaymentDoneService');
