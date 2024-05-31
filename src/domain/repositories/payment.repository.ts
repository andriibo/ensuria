import {PaymentEntity} from 'domain/entities';

export interface IPaymentRepository {
  save(entity: PaymentEntity): Promise<PaymentEntity>;
}

export const IPaymentRepository = Symbol('IPaymentRepository');
