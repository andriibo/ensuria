import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {IPaymentHistoryRepository} from 'domain/repositories';
import {PaymentHistoryEntity} from "domain/entities";
import {PaymentHistoryModel} from "infrastructure/modules/payment/models";

@Injectable()
export class PaymentHistoryRepository implements IPaymentHistoryRepository {
  constructor(
    @InjectRepository(PaymentHistoryModel)
    private readonly repository: Repository<PaymentHistoryModel>,
  ) {}

  async save(entity: PaymentHistoryModel): Promise<PaymentHistoryEntity> {
    return await this.repository.save(entity);
  }
}
