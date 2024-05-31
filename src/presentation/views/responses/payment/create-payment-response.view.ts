import { ApiProperty } from '@nestjs/swagger';
import {CreatePaymentResponseDto} from "domain/dto/responses/payment";

export class CreatePaymentResponseView extends CreatePaymentResponseDto {
  @ApiProperty()
  paymentId: string;
}
