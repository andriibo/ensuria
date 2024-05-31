import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {IPaymentRepository} from 'domain/repositories';
import {PaymentModel} from "infrastructure/modules/payment/models";
import {PaymentUseCasesFactory} from "infrastructure/modules/payment/factories";
import {PaymentRepository} from "infrastructure/modules/payment/repositories";
import {PaymentController} from "presentation/controllers/payment.controller";
import {CreatePaymentHandler} from "application/modules/payment/handlers";
import {IPaymentService} from "application/modules/payment/services";
import {PaymentService} from "infrastructure/modules/payment/services";
import {ShopModule} from "infrastructure/modules/shop/shop.module";

@Module({
    imports: [TypeOrmModule.forFeature([PaymentModel]), ShopModule],
    controllers: [PaymentController],
    providers: [
        PaymentUseCasesFactory,
        CreatePaymentHandler,
        {
            provide: IPaymentRepository,
            useClass: PaymentRepository,
        },
        {
            provide: IPaymentService,
            useClass: PaymentService,
        },
    ],
})
export class PaymentModule {}
