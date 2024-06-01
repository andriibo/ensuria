import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {IPaymentHistoryRepository, IPaymentRepository} from 'domain/repositories';
import {PaymentHistoryModel, PaymentModel} from "infrastructure/modules/payment/models";
import {PaymentUseCasesFactory} from "infrastructure/modules/payment/factories";
import {PaymentHistoryRepository, PaymentRepository} from "infrastructure/modules/payment/repositories";
import {PaymentController} from "presentation/controllers/payment.controller";
import {CreatePaymentHandler, ProceedPaymentsHandler} from "application/modules/payment/handlers";
import {IPaymentService, IProceedPaymentsService} from "application/modules/payment/services";
import {PaymentService, ProceedPaymentsService} from "infrastructure/modules/payment/services";
import {ShopModule} from "infrastructure/modules/shop/shop.module";
import {SettingsModule} from "infrastructure/modules/settings/settings.module";
import {AmountBlockedCalculator, CommissionCalculator} from "domain/calculators";
import {ClientModule} from "infrastructure/modules/client/client.module";

@Module({
    imports: [TypeOrmModule.forFeature([PaymentModel, PaymentHistoryModel]), ShopModule, SettingsModule, ClientModule],
    controllers: [PaymentController],
    providers: [
        PaymentUseCasesFactory,
        CreatePaymentHandler,
        ProceedPaymentsHandler,
        CommissionCalculator,
        AmountBlockedCalculator,
        {
            provide: IPaymentRepository,
            useClass: PaymentRepository,
        },
        {
            provide: IPaymentHistoryRepository,
            useClass: PaymentHistoryRepository,
        },
        {
            provide: IPaymentService,
            useClass: PaymentService,
        },
        {
            provide: IProceedPaymentsService,
            useClass: ProceedPaymentsService,
        },
    ],
})
export class PaymentModule {}
