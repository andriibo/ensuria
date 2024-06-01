import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {IClientRepository} from 'domain/repositories';
import {ClientModel} from "infrastructure/modules/client/models";
import {ClientRepository} from "infrastructure/modules/client/repositories";

@Module({
    imports: [TypeOrmModule.forFeature([ClientModel])],
    exports: [IClientRepository],
    providers: [
        {
            provide: IClientRepository,
            useClass: ClientRepository,
        },
    ],
})
export class ClientModule {}
