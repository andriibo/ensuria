import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {CreateShopCommand} from "application/modules/shop/commands";
import {IShopService} from "application/modules/shop/services/shop.service";
import {BadRequestError} from "application/errors";
import {IShopRepository} from "domain/repositories";
import {ShopEntity} from "domain/entities";

@CommandHandler(CreateShopCommand)
export class CreateShopHandler
  implements ICommandHandler<CreateShopCommand>
{
  constructor(
      @Inject(IShopRepository) private readonly shopRepository: IShopRepository,
      @Inject(IShopService) private readonly shopService: IShopService
  ) {}

  async execute(command: CreateShopCommand): Promise<ShopEntity> {
    const { name, commissionC } = command;

    const findModel = await this.shopRepository.findByName(name);
    if (findModel) {
      throw new BadRequestError('Shop already exists.');
    }

    return await this.shopService.create(name, commissionC);
  }
}
