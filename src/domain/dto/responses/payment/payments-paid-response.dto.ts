export class PaymentResponseDto {
  constructor(readonly id: string, readonly amount: number) {}
}

export class PaymentsPaidResponseDto {
  totalAmount = 0;
  payments: PaymentResponseDto[] = [];
}
