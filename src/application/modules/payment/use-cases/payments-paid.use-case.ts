import {ICommandBus} from '@nestjs/cqrs';
import {PaymentsPaidCommand} from 'application/modules/payment/commands';
import {PaymentsPaidResponseDto} from "domain/dto/responses/payment";

export class PaymentsPaidUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  async paid(shopId: string): Promise<PaymentsPaidResponseDto> {
    return await this.commandBus.execute(new PaymentsPaidCommand(shopId));
  }
}
