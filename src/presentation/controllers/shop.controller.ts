import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConsumes,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {ShopUseCasesFactory} from "infrastructure/modules/shop/factories";
import {CreateShopRequestView} from "presentation/views/requests/shop";
import {CreateShopResponseDto} from "domain/dto/responses/shop";
import {CreateShopResponseView} from "presentation/views/responses/shop";

@Controller('shops')
@ApiTags('Shop')
export class ShopController {
    constructor(
        private readonly shopUseCasesFactory: ShopUseCasesFactory
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: CreateShopResponseView })
    @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    async create(@Body() request: CreateShopRequestView): Promise<CreateShopResponseDto> {
        const useCase =
            this.shopUseCasesFactory.createAddShopUseCase();

        return await useCase.create(request);
    }
}
