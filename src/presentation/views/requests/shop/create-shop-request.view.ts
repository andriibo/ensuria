import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, Max, MaxLength, Min} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {CreateShopRequestDto} from "domain/dto/requests/shop";

export class CreateShopRequestView extends CreateShopRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  @Transform(({ value }: TransformFnParams) => value.trim())
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  commissionC: number;
}
