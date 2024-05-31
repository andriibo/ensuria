import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsUUID, Max, Min} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {CreatePaymentRequestDto} from "domain/dto/requests/payment";

export class CreatePaymentRequestView extends CreatePaymentRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  shopId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  @Max(1000000)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  amount: number;
}
