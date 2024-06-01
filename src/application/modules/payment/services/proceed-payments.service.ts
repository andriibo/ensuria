export interface IProceedPaymentsService {
  proceed(paymentIds: string[]): Promise<void>;
}

export const IProceedPaymentsService = Symbol('IProceedPaymentsService');
