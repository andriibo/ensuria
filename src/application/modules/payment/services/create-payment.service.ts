import {PaymentEntity} from 'domain/entities';

export interface ICreatePaymentService {
  create(shopId: string, amount: number): Promise<PaymentEntity>;
}

export const ICreatePaymentService = Symbol('ICreatePaymentService');
