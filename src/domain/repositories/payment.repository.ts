import {PaymentEntity} from 'domain/entities';

export interface IPaymentRepository {
  findNewByIds(ids: string[]): Promise<PaymentEntity[]>;
  findProceedAndPaidByIds(ids: string[]): Promise<PaymentEntity[]>;
  findProceedAndDoneByShopId(shopId: string): Promise<PaymentEntity[]>;
  findProceedAndDone(): Promise<PaymentEntity[]>;
  save(entity: PaymentEntity): Promise<PaymentEntity>;
}

export const IPaymentRepository = Symbol('IPaymentRepository');
