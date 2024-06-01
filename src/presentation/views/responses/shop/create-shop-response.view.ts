import { ApiProperty } from '@nestjs/swagger';
import {CreateShopResponseDto} from "domain/dto/responses/shop";

export class CreateShopResponseView extends CreateShopResponseDto {
  @ApiProperty({format: 'uuid'})
  shopId: string;
}
