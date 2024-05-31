import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, Max, MaxLength, Min} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {CreateShopRequestDto} from "domain/dto/requests/shop";

export class CreateShopRequest extends CreateShopRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  commissionC: number;
}
