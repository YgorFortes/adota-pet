import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';
import { Response, NextFunction } from 'express';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { UserRole } from '../enum/roleUser.enum';
import { IUserWithAssociation } from '../interfaces/IUserWithAssociation';
import { IRouteInfo } from '../interfaces/IRouterInfo.interface';

@Injectable()
export class RoleUserMiddleware implements NestMiddleware {
  constructor(private findUserById: FindUserByIdUseCase) {}
  async use(request: IRequestWithUser, response: Response, next: NextFunction): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, routePath] = (request as IRouteInfo).route.path.split('/');

    if (!('user' in request)) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    const userId = request.user.sub;
    const user = await this.findUserById.execute(userId);

    if (!this.isAllowedRole(user.role, routePath)) {
      throw new ForbiddenException(
        `O usuário ${user.name}, id: ${user.id} não tem acesso a rota: ${routePath}`,
      );
    }

    if (this.isMethodPost(request)) {
      next();
    }

    const hasValidAssociation = await this.hasValidAssociation(user);

    if (hasValidAssociation) {
      next();
    }

    throw new ForbiddenException(
      `O usuário ${user.name}, id: ${user.id} não tem acesso a rota: ${routePath}`,
    );
  }

  private isAllowedRole(userRole: UserRole, routePath: string): boolean {
    const allowedRoles: UserRole[] = [UserRole.GUARDIAN, UserRole.SHELTER];
    return allowedRoles.includes(userRole) && userRole === routePath;
  }

  private isMethodPost(request: IRequestWithUser): boolean {
    const method = request.method;

    return method === 'POST';
  }

  private async hasValidAssociation(user: IUserWithAssociation): Promise<boolean> {
    const associationType = user.role === UserRole.GUARDIAN ? UserRole.GUARDIAN : UserRole.SHELTER;

    const association = await this.findUserById.execute(user.id, associationType);

    return user.role === UserRole.GUARDIAN ? !!association['guardian'] : !!association['shelter'];
  }
}
