import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RequestWithUser } from 'src/common/guards/Authentication.guard';

@Catch()
export class ExepectionErrror implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private logger: ConsoleLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception);
    console.error(exception);

    const { httpAdapter } = this.adapterHost;

    const context = host.switchToHttp();
    const request = context.getRequest<RequestWithUser>();
    const response = context.getResponse();

    if ('user' in request) {
      this.logger.log(`Rota acessada pelo usuário: ${request.user.sub}`);
    }

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timeStamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(request),
            },
          };
    httpAdapter.reply(response, body, status);
  }
}
