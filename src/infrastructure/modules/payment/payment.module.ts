import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {IPaymentHistoryRepository, IPaymentRepository} from 'domain/repositories';
import {PaymentHistoryModel, PaymentModel} from "infrastructure/modules/payment/models";
import {PaymentUseCasesFactory} from "infrastructure/modules/payment/factories";
import {PaymentHistoryRepository, PaymentRepository} from "infrastructure/modules/payment/repositories";
import {PaymentController} from "presentation/controllers/payment.controller";
import {
    CreatePaymentHandler,
    PaymentsDoneHandler,
    PaymentsPaidForShopHandler,
    PaymentsProceedHandler,
    PaymentsPaidHandler
} from "application/modules/payment/handlers";
import {
    ICreatePaymentService,
    IPaymentDoneService,
    IPaymentPaidService,
    IPaymentsProceedService,
} from "application/modules/payment/services";
import {
    CreatePaymentService,
    PaymentDoneService,
    PaymentPaidService,
    PaymentsProceedService,
} from "infrastructure/modules/payment/services";
import {ShopModule} from "infrastructure/modules/shop/shop.module";
import {SettingsModule} from "infrastructure/modules/settings/settings.module";
import {AmountBlockedCalculator, CommissionCalculator} from "domain/calculators";
import {ClientModule} from "infrastructure/modules/client/client.module";
import {PaymentsPaidJob} from "infrastructure/modules/payment/jobs";

@Module({
    imports: [TypeOrmModule.forFeature([PaymentModel, PaymentHistoryModel]), ShopModule, SettingsModule, ClientModule],
    controllers: [PaymentController],
    providers: [
        PaymentUseCasesFactory,
        CreatePaymentHandler,
        PaymentsProceedHandler,
        PaymentsDoneHandler,
        PaymentsPaidForShopHandler,
        PaymentsPaidHandler,
        CommissionCalculator,
        AmountBlockedCalculator,
        PaymentsPaidJob,
        {
            provide: IPaymentRepository,
            useClass: PaymentRepository,
        },
        {
            provide: IPaymentHistoryRepository,
            useClass: PaymentHistoryRepository,
        },
        {
            provide: ICreatePaymentService,
            useClass: CreatePaymentService,
        },
        {
            provide: IPaymentsProceedService,
            useClass: PaymentsProceedService,
        },
        {
            provide: IPaymentDoneService,
            useClass: PaymentDoneService,
        },
        {
            provide: IPaymentPaidService,
            useClass: PaymentPaidService,
        },
    ],
})
export class PaymentModule {}
