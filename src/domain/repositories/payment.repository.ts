import {PaymentEntity} from 'domain/entities';

export interface IPaymentRepository {
  findNewByIds(ids: string[]): Promise<PaymentEntity[]>;
  findProceedByIds(ids: string[]): Promise<PaymentEntity[]>;
  findDoneByShopId(shopId: string): Promise<PaymentEntity[]>;
  save(entity: PaymentEntity): Promise<PaymentEntity>;
}

export const IPaymentRepository = Symbol('IPaymentRepository');
