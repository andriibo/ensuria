import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {IPaymentRepository} from 'domain/repositories';
import {PaymentEntity} from "domain/entities";
import {PaymentModel} from "infrastructure/modules/payment/models";
import {StatusEnum} from "domain/enums";

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(PaymentModel)
    private readonly repository: Repository<PaymentModel>,
  ) {}

  async findNewByIds(ids: string[]): Promise<PaymentEntity[]> {
    return await this.repository.find({
      relations: ['shop'],
      where: {id: In(ids), status: StatusEnum.New}
    });
  }

  async findProceedAndPaidByIds(ids: string[]): Promise<PaymentEntity[]> {
    return await this.repository.find({
      relations: ['paymentHistory'],
      where: {id: In(ids), status: In([StatusEnum.Proceed, StatusEnum.Paid])}
    });
  }

  async findProceedAndDoneByShopId(shopId: string): Promise<PaymentEntity[]> {
    return await this.repository.find({
      relations: ['paymentHistory'],
      where: {shopId, status: In([StatusEnum.Proceed, StatusEnum.Done])},
      order: {amount: 'ASC'}
    });
  }

  async findProceedAndDone(): Promise<PaymentEntity[]> {
    return await this.repository.find({
      relations: ['paymentHistory'],
      where: {status: In([StatusEnum.Proceed, StatusEnum.Done])}
    });
  }

  async save(entity: PaymentModel): Promise<PaymentEntity> {
    return await this.repository.save(entity);
  }
}
