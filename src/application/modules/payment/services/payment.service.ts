import {PaymentEntity} from 'domain/entities';

export interface IPaymentService {
  create(shopId: string, amount: number): Promise<PaymentEntity>;
}

export const IPaymentService = Symbol('IPaymentService');
