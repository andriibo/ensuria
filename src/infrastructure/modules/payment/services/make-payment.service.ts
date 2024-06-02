import {Inject, Injectable} from '@nestjs/common';
import {PaymentEntity} from "domain/entities";
import {
  IMakePaymentService,
  IPaymentDoneService,
  IPaymentPaidService,
} from "application/modules/payment/services";
import {StatusEnum} from "domain/enums";

@Injectable()
export class MakePaymentService implements IMakePaymentService {
  constructor(
      @Inject(IPaymentDoneService) private readonly paymentDoneService: IPaymentDoneService,
      @Inject(IPaymentPaidService) private readonly paymentPaidService: IPaymentPaidService,
  ) {}

  async make(payment: PaymentEntity): Promise<number | undefined> {
    let model = payment;
    if (model.status === StatusEnum.Proceed) {
      model = await this.paymentDoneService.done(payment);
    }

    if (model.status === StatusEnum.Done) {
      return await this.paymentPaidService.pay(model);
    }
  }
}
