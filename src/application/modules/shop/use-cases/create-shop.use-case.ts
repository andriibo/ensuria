import {ICommandBus} from '@nestjs/cqrs';
import {CreateShopRequestDto} from "domain/dto/requests/shop";
import {CreateShopCommand} from "application/modules/shop/commands";
import {CreateShopResponseDto} from "domain/dto/responses/shop";

export class CreateShopUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  async create(dto: CreateShopRequestDto): Promise<CreateShopResponseDto> {
    const shop = await this.commandBus.execute(new CreateShopCommand(dto.name, dto.commissionC));

    return new CreateShopResponseDto(shop.id);
  }
}
