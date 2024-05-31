import {ICommandBus} from '@nestjs/cqrs';
import {CreatePaymentRequestDto} from "domain/dto/requests/payment";
import {CreatePaymentCommand} from "application/modules/payment/commands";
import {CreatePaymentResponseDto} from "domain/dto/responses/payment";

export class CreatePaymentUseCase {
  constructor(private readonly commandBus: ICommandBus) {}

  async create(dto: CreatePaymentRequestDto): Promise<CreatePaymentResponseDto> {
    const payment = await this.commandBus.execute(new CreatePaymentCommand(dto.shopId, dto.amount));

    return new CreatePaymentResponseDto(payment.id);
  }
}
