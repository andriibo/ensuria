import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {SettingsRequestDto} from "domain/dto/requests/settings";

export class SettingsRequestView extends SettingsRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  @Max(1000)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  commissionA: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  commissionB: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  blockingD: number;
}
