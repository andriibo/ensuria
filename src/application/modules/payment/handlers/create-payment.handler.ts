import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {PaymentEntity} from "domain/entities";
import {CreatePaymentCommand} from "application/modules/payment/commands";
import {ICreatePaymentService} from "application/modules/payment/services";
import {IShopRepository} from "domain/repositories";
import {NotFoundError} from "application/errors";

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand>
{
  constructor(
      @Inject(IShopRepository) private readonly shopRepository: IShopRepository,
      @Inject(ICreatePaymentService) private readonly createPaymentService: ICreatePaymentService,
  ) {}

  async execute(command: CreatePaymentCommand): Promise<PaymentEntity> {
    const { shopId, amount } = command;

    const shop = await this.shopRepository.findById(shopId);
    if (!shop) {
      throw new NotFoundError('Shop not found.');
    }

    return await this.createPaymentService.create(shopId, amount);
  }
}
