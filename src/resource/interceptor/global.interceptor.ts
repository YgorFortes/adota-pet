import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';

@Injectable()
export class GlobalLogger implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    const contextHttp = context.switchToHttp();

    const request = contextHttp.getRequest<IRequestWithUser>();

    const response = contextHttp.getResponse<Response>();

    const { path, method } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${path}`);

    const instantPreController = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(`Rota acessada pelo usuário: ${request.user.sub}`);
        }

        const timeStamp = Date.now() - instantPreController;

        this.logger.log(`Resposta: status ${statusCode} - ${timeStamp} ms`);
      }),
    );
  }
}
