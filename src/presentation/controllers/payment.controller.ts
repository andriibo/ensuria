import {Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConsumes, ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {PaymentUseCasesFactory} from "infrastructure/modules/payment/factories";
import {CreatePaymentRequestView, PaymentsRequestView} from "presentation/views/requests/payment";
import {CreatePaymentResponseDto, PaymentsPaidResponseDto} from "domain/dto/responses/payment";
import {CreatePaymentResponseView} from "presentation/views/responses/payment";
import {PaymentsPaidResponseView} from "presentation/views/responses/payment/payments-paid-response.view";

@Controller('payments')
@ApiTags('Payment')
export class PaymentController {
    constructor(
        private readonly paymentUseCasesFactory: PaymentUseCasesFactory
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: CreatePaymentResponseView })
    @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiNotFoundResponse({ description: 'Not found' })
    async create(@Body() request: CreatePaymentRequestView): Promise<CreatePaymentResponseDto> {
        const useCase =
            this.paymentUseCasesFactory.createAddPaymentUseCase();

        return await useCase.create(request);
    }

    @Post('proceed')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({ description: 'No content' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
    @ApiNotFoundResponse({ description: 'Not found' })
    async proceed(@Body() request: PaymentsRequestView): Promise<void> {
        const useCase =
            this.paymentUseCasesFactory.createPaymentsProceedUseCase();

        await useCase.proceed(request.paymentIds);
    }

    @Post('done')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({ description: 'No content' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
    @ApiNotFoundResponse({ description: 'Not found' })
    async done(@Body() request: PaymentsRequestView): Promise<void> {
        const useCase =
            this.paymentUseCasesFactory.createPaymentsDoneUseCase();

        await useCase.done(request.paymentIds);
    }

    @Post('/:shopId/paid')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PaymentsPaidResponseView })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
    @ApiNotFoundResponse({ description: 'Not found' })
    async paid(@Param('shopId', ParseUUIDPipe) shopId: string): Promise<PaymentsPaidResponseDto> {
        const useCase =
            this.paymentUseCasesFactory.createPaymentsPaidUseCase();

        return await useCase.paid(shopId);
    }
}
