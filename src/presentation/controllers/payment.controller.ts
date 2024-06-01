import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConsumes, ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {PaymentUseCasesFactory} from "infrastructure/modules/payment/factories";
import {CreatePaymentRequestView, ProceedPaymentsRequestView} from "presentation/views/requests/payment";
import {CreatePaymentResponseDto} from "domain/dto/responses/payment";
import {CreatePaymentResponseView} from "presentation/views/responses/payment";

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
    async proceed(@Body() request: ProceedPaymentsRequestView): Promise<void> {
        const useCase =
            this.paymentUseCasesFactory.createProceedPaymentsUseCase();

        return await useCase.proceed(request.paymentIds);
    }
}
