import {PaymentEntity} from "domain/entities";

export interface IPaymentPaidService {
  pay(payment: PaymentEntity): Promise<number | undefined>;
}

export const IPaymentPaidService = Symbol('IPaymentPaidService');
