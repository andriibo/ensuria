import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {SettingsRequestDto} from "domain/dto/requests/settings";
import {MaxBlockingD, MaxCommissionA, MaxCommissionB, MinBlockingD, MinCommissionA, MinCommissionB} from "domain/const";

export class SettingsRequestView extends SettingsRequestDto {
  @ApiProperty({minimum: MinCommissionA, maximum: MaxCommissionA})
  @IsNotEmpty()
  @Min(MinCommissionA)
  @Max(MaxCommissionA)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  commissionA: number;

  @ApiProperty({minimum: MinCommissionB, maximum: MaxCommissionB})
  @IsNotEmpty()
  @Min(MinCommissionB)
  @Max(MaxCommissionB)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  commissionB: number;

  @ApiProperty({minimum: MinBlockingD, maximum: MaxBlockingD})
  @IsNotEmpty()
  @Min(MinBlockingD)
  @Max(MaxBlockingD)
  @Transform(({ value }: TransformFnParams) => parseFloat(value))
  blockingD: number;
}
