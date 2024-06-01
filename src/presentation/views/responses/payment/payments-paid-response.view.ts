import { ApiProperty } from '@nestjs/swagger';
import {PaymentsPaidResponseDto} from "domain/dto/responses/payment";

class PaymentResponseView {
  @ApiProperty({format: 'uuid'})
  id: string;

  @ApiProperty()
  amount: number;
}

export class PaymentsPaidResponseView extends PaymentsPaidResponseDto {
  @ApiProperty()
  totalAmount: number;

  @ApiProperty({isArray: true, type: PaymentResponseView})
  payments: PaymentResponseView[];
}
