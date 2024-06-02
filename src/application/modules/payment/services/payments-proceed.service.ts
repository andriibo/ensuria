import {PaymentEntity} from "domain/entities";

export interface IPaymentsProceedService {
  proceed(payments: PaymentEntity[]): Promise<void>;
}

export const IPaymentsProceedService = Symbol('IPaymentsProceedService');
