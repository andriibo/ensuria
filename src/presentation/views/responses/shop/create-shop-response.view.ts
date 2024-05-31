import { ApiProperty } from '@nestjs/swagger';
import {CreateShopResponseDto} from "domain/dto/responses/shop";

export class CreateShopResponseView extends CreateShopResponseDto {
  @ApiProperty()
  shopId: string;
}
