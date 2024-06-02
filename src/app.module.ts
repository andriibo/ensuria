import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {SettingsModule} from "infrastructure/modules/settings/settings.module";
import {dbConnectionOptions} from "config/db.config";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ErrorsInterceptor} from "presentation/interceptors";
import {ShopModule} from "infrastructure/modules/shop/shop.module";
import {PaymentModule} from "infrastructure/modules/payment/payment.module";
import {ClientModule} from "infrastructure/modules/client/client.module";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dbConnectionOptions, autoLoadEntities: true }),
    ScheduleModule.forRoot(),
    CqrsModule.forRoot(),
    SettingsModule,
    ShopModule,
    PaymentModule,
    ClientModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
