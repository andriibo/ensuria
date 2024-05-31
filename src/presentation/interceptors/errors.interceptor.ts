import {
    Injectable,
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import {BadRequestError} from 'application/errors';
import {catchError, Observable, throwError} from 'rxjs';
import {TypeORMError} from 'typeorm';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                if (err instanceof BadRequestError) {
                    return throwError(() => new NotFoundException(err.message));
                }

                if (err instanceof TypeORMError) {
                    return throwError(
                        () => new UnprocessableEntityException(err.message),
                    );
                }

                return throwError(() => err);
            }),
        );
    }
}
