import {CommandBus} from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import {CreateShopUseCase} from "application/modules/shop/use-cases";

@Injectable()
export class ShopUseCasesFactory {
  constructor(private readonly commandBus: CommandBus) {}

  createSaveShopUseCase(): CreateShopUseCase {
    return new CreateShopUseCase(this.commandBus);
  }
}
