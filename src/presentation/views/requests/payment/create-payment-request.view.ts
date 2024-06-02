import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsUUID, Max, Min} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {CreatePaymentRequestDto} from "domain/dto/requests/payment";
import {MaxAmount, MinAmount} from "domain/const";

export class CreatePaymentRequestView extends CreatePaymentRequestDto {
  @ApiProperty({format: 'uuid'})
  @IsNotEmpty()
  @IsUUID()
  shopId: string;

  @ApiProperty({minimum: MinAmount, maximum: MaxAmount})
  @IsNotEmpty()
  @Min(MinAmount)
  @Max(MaxAmount)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  amount: number;
}
