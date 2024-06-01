export interface IPaymentsDoneService {
  done(paymentIds: string[]): Promise<void>;
}

export const IPaymentsDoneService = Symbol('IPaymentsDoneService');
