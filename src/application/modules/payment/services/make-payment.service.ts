import {PaymentEntity} from "domain/entities";

export interface IMakePaymentService {
  make(payment: PaymentEntity): Promise<number | undefined>;
}

export const IMakePaymentService = Symbol('IMakePaymentService');
