import {PaymentHistoryEntity} from 'domain/entities';

export interface IPaymentHistoryRepository {
  save(entity: PaymentHistoryEntity): Promise<PaymentHistoryEntity>;
}

export const IPaymentHistoryRepository = Symbol('IPaymentHistoryRepository');
