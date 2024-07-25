import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';
import { Response, NextFunction } from 'express';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { UserRole } from '../enum/roleUser.enum';
import { IRouteInfo } from '../interfaces/IRouterInfo.interface';
import { IUserWithAssociation } from '../interfaces/IUserWithAssociation';

@Injectable()
export class GuardianAuthenticationMiddleware implements NestMiddleware {
  constructor(private findUserById: FindUserByIdUseCase) {}

  async use(request: IRequestWithUser, response: Response, next: NextFunction): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, routePath] = (request as IRouteInfo).route.path.split('/');

    if ('user' in request) {
      const userId = request.user.sub;
      const user = await this.findUserById.execute(userId, UserRole.GUARDIAN);

      if (this.isPostRequestToGuardianRoute(request, user, routePath)) {
        return next();
      }

      if (user.role === UserRole.GUARDIAN && user.guardian) {
        return next();
      }

      const params = request.params.id ? `/:${request.params.id}` : '';

      throw new ForbiddenException(
        `O usuário ${user.name}, id: ${user.id} não tem acesso a rota: ${request.method} ${routePath}${params}`,
      );
    }
  }

  private isPostRequestToGuardianRoute(
    request: IRequestWithUser,
    user: IUserWithAssociation,
    routePath: string,
  ): boolean {
    return (
      request.method === 'POST' &&
      routePath === UserRole.GUARDIAN &&
      user.role === UserRole.GUARDIAN
    );
  }
}
