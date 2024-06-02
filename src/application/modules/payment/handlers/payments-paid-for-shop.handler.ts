import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {PaymentsPaidForShopCommand} from "application/modules/payment/commands";
import {PaymentResponseDto, PaymentsPaidResponseDto} from "domain/dto/responses/payment";
import {IPaymentRepository} from "domain/repositories";
import {IMakePaymentService} from "application/modules/payment/services";

@CommandHandler(PaymentsPaidForShopCommand)
export class PaymentsPaidForShopHandler
  implements ICommandHandler<PaymentsPaidForShopCommand>
{
  constructor(
      @Inject(IPaymentRepository) private readonly paymentRepository: IPaymentRepository,
      @Inject(IMakePaymentService) private readonly makePaymentService: IMakePaymentService,
  ) {}

  async execute(command: PaymentsPaidForShopCommand): Promise<PaymentsPaidResponseDto> {
    const { shopId } = command;

    const payments = await this.paymentRepository.findProceedAndDoneByShopId(shopId);
    if (!payments.length) {
      return;
    }

    const response = new PaymentsPaidResponseDto();
    for await (const payment of payments) {
      const amount = await this.makePaymentService.make(payment);
      if (amount) {
        response.totalAmount += amount;
        response.payments.push(new PaymentResponseDto(payment.id, amount));
      }
    }

    return response;
  }
}
