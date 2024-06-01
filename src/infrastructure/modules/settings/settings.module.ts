import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ISettingsRepository} from 'domain/repositories';
import {SettingsModel} from "infrastructure/modules/settings/models";
import {SettingsController} from "presentation/controllers";
import {SettingsUseCasesFactory} from "infrastructure/modules/settings/factories";
import {SaveSettingsHandler} from "application/modules/settings/handlers";
import {SettingsRepository} from "infrastructure/modules/settings/repositories";
import {ISettingsService} from "application/modules/settings/services";
import {SettingsService} from "infrastructure/modules/settings/services";

@Module({
    imports: [TypeOrmModule.forFeature([SettingsModel])],
    exports: [ISettingsRepository],
    controllers: [SettingsController],
    providers: [
        SettingsUseCasesFactory,
        SaveSettingsHandler,
        {
            provide: ISettingsRepository,
            useClass: SettingsRepository,
        },
        {
            provide: ISettingsService,
            useClass: SettingsService,
        },
    ],
})
export class SettingsModule {}
