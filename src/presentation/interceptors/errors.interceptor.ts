import {
    Injectable,
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    UnprocessableEntityException, BadRequestException, NotFoundException,
} from '@nestjs/common';
import {BadRequestError, NotFoundError} from 'application/errors';
import {catchError, Observable, throwError} from 'rxjs';
import {TypeORMError} from 'typeorm';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof BadRequestError) {
                    return throwError(() => new BadRequestException(error.message));
                }

                if (error instanceof NotFoundError) {
                    return throwError(() => new NotFoundException(error.message));
                }

                if (error instanceof TypeORMError) {
                    return throwError(
                        () => new UnprocessableEntityException(error.message),
                    );
                }

                return throwError(() => error);
            }),
        );
    }
}
