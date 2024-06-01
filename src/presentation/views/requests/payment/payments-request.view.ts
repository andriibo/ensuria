import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {IsUUIDs} from "presentation/validators";

export class PaymentsRequestView {
  @ApiProperty({isArray: true, type: String, format: 'uuid'})
  @IsUUIDs()
  @IsNotEmpty()
  paymentIds: string[];
}
