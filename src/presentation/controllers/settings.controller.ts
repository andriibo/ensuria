import {Body, Controller, HttpCode, HttpStatus, Put} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConsumes,
    ApiNoContentResponse,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {SettingsUseCasesFactory} from "infrastructure/modules/settings/factories";
import {SettingsRequest} from "presentation/views/requests/settings";

@Controller()
@ApiTags('Settings')
export class SettingsController {
    constructor(
        private readonly settingsUseCasesFactory: SettingsUseCasesFactory
    ) {}

    @Put('settings')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({ description: 'No content' })
    @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    async save(@Body() request: SettingsRequest): Promise<void> {
        const useCase =
            this.settingsUseCasesFactory.createSaveSettingsUseCase();

        await useCase.save(request);
    }
}
