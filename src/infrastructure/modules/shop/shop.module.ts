import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {IShopRepository} from 'domain/repositories';
import {ShopModel} from "infrastructure/modules/shop/models";
import {ShopController} from "presentation/controllers/shop.controller";
import {ShopUseCasesFactory} from "infrastructure/modules/shop/factories";
import {CreateShopHandler} from "application/modules/shop/handlers";
import {ShopRepository} from "infrastructure/modules/shop/repositories";
import {IShopService} from "application/modules/shop/services/shop.service";
import {ShopService} from "infrastructure/modules/shop/services";
import {ClientModule} from "infrastructure/modules/client/client.module";

@Module({
    imports: [TypeOrmModule.forFeature([ShopModel]), ClientModule],
    exports: [IShopRepository],
    controllers: [ShopController],
    providers: [
        ShopUseCasesFactory,
        CreateShopHandler,
        {
            provide: IShopRepository,
            useClass: ShopRepository,
        },
        {
            provide: IShopService,
            useClass: ShopService,
        },
    ],
})
export class ShopModule {}
