import {PaymentsPaidResponseDto} from "domain/dto/responses/payment";

export interface IPaymentsPaidService {
  paid(shopId: string): Promise<PaymentsPaidResponseDto>;
}

export const IPaymentsPaidService = Symbol('IPaymentsPaidService');
