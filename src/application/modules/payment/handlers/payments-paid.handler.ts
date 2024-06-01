import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {PaymentsPaidCommand} from "application/modules/payment/commands";
import {IPaymentsPaidService} from "application/modules/payment/services";
import {PaymentsPaidResponseDto} from "domain/dto/responses/payment";

@CommandHandler(PaymentsPaidCommand)
export class PaymentsPaidHandler
  implements ICommandHandler<PaymentsPaidCommand>
{
  constructor(
      @Inject(IPaymentsPaidService) private readonly paymentsPaidService: IPaymentsPaidService,
  ) {}

  async execute(command: PaymentsPaidCommand): Promise<PaymentsPaidResponseDto> {
    const { shopId } = command;

    return await this.paymentsPaidService.paid(shopId);
  }
}
