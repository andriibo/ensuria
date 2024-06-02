import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, Max, MaxLength, Min} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {CreateShopRequestDto} from "domain/dto/requests/shop";
import {MaxCommissionC, MinCommissionC} from "domain/const";

export class CreateShopRequestView extends CreateShopRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  @Transform(({ value }: TransformFnParams) => value.trim())
  name: string;

  @ApiProperty({minimum: MinCommissionC, maximum: MaxCommissionC})
  @IsNotEmpty()
  @Min(MinCommissionC)
  @Max(MaxCommissionC)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  commissionC: number;
}
