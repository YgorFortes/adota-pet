import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class GlobalLogger implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const contextHttp = context.switchToHttp();

    const request = contextHttp.getRequest<Request>();

    const response = contextHttp.getResponse<Response>();

    const { path, method } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${path}`);

    const instantPreController = Date.now();

    return next.handle().pipe(
      tap(() => {
        //to do when implements user
        /*   if ('usuario' in request) { //quando tiver user 
          this.logger.log(`Rota acessada pelo usuário: ${request.usuario.sub}`);
        } */

        const timeStamp = Date.now() - instantPreController;

        this.logger.log(`Resposta: status ${statusCode} - ${timeStamp} ms`);
      }),
    );
  }
}
