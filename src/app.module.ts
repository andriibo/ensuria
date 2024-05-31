import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {SettingsModule} from "infrastructure/modules/settings/settings.module";
import {dbConnectionOptions} from "config/db.config";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ErrorsInterceptor} from "presentation/interceptors";
import {ShopModule} from "infrastructure/modules/shop/shop.module";
import {PaymentModule} from "infrastructure/modules/payment/payment.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dbConnectionOptions, autoLoadEntities: true }),
    CqrsModule.forRoot(),
    SettingsModule,
    ShopModule,
    PaymentModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
