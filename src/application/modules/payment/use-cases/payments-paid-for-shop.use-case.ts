import {ICommandBus} from '@nestjs/cqrs';
import {PaymentsPaidForShopCommand} from 'application/modules/payment/commands';
import {PaymentsPaidResponseDto} from "domain/dto/responses/payment";

export class PaymentsPaidForShopUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  async pay(shopId: string): Promise<PaymentsPaidResponseDto> {
    return await this.commandBus.execute(new PaymentsPaidForShopCommand(shopId));
  }
}
