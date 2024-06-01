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
    return await this.repository.findBy({id: In(ids), status: StatusEnum.New});
  }

  async save(entity: PaymentModel): Promise<PaymentEntity> {
    return await this.repository.save(entity);
  }
}
