export interface IPaymentsProceedService {
  proceed(paymentIds: string[]): Promise<void>;
}

export const IPaymentsProceedService = Symbol('IPaymentsProceedService');
