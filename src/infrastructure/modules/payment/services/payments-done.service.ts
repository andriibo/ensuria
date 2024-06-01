import {Inject, Injectable} from '@nestjs/common';
import {IClientRepository, IPaymentRepository} from "domain/repositories";
import {ClientEntity, PaymentEntity} from "domain/entities";
import {ClientModel} from "infrastructure/modules/client/models";
import {IPaymentsDoneService} from "application/modules/payment/services";
import {StatusEnum} from "domain/enums";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {PaymentHistoryModel} from "infrastructure/modules/payment/models";

@Injectable()
export class PaymentsDoneService implements IPaymentsDoneService {
  private clients: Map<string, ClientEntity> = new Map();

  constructor(
      @Inject(IPaymentRepository) private readonly paymentRepository: IPaymentRepository,
      @Inject(IClientRepository) private readonly clientRepository: IClientRepository,
      @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async done(paymentIds: string[]): Promise<void> {
    const payments = await this.paymentRepository.findProceedByIds(paymentIds);
    if (!payments.length) {
      return;
    }

    for await (const payment of payments) {
      await this.donePayment(payment);
    }
  }

  private async donePayment(payment: PaymentEntity): Promise<void> {
    const paymentProceed = payment.paymentHistory.find(history => history.status === StatusEnum.Proceed);
    if (!paymentProceed) {
      return;
    }

    const client = await this.getClient(payment.shopId);
    const status = StatusEnum.Done;
    const amountHistory = Number(paymentProceed.amount) + Number(paymentProceed.amountBlocked);
    const paymentId = payment.id;
    if (client.balance < amountHistory) {
      return;
    }

    await this.dataSource.transaction(async (entityManager) => {
      const paymentHistoryModel = entityManager.create(PaymentHistoryModel, {
        paymentId,
        amount: amountHistory,
        amountBlocked: 0,
        status
      });
      payment.paymentHistory.push(paymentHistoryModel);
      await entityManager.save(paymentHistoryModel);

      payment.status = status;
      await entityManager.save(payment);

      client.balance = Number(client.balance) - amountHistory;
      const clientUpdated = await entityManager.save(client);

      this.clients.set(client.shopId, clientUpdated);
    });
  }

  private async getClient(shopId: string): Promise<ClientEntity> {
    if (this.clients.has(shopId)) {
      return this.clients.get(shopId);
    } else {
      let client = await this.clientRepository.findByShopId(shopId);
      if (!client) {
        client = new ClientModel();
        client.shopId = shopId;
        client.balance = 0;
      }

      return client;
    }
  }
}
