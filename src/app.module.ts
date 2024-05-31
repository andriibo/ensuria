import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {SettingsModule} from "infrastructure/modules/settings/settings.module";
import {dbConnectionOptions} from "config/db.config";

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dbConnectionOptions, autoLoadEntities: true }),
    CqrsModule.forRoot(),
    SettingsModule,
  ],
})
export class AppModule {}
