import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { UserRole } from 'src/enum/roleUser.enum';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';

import { IRouteInfo } from '../interfaces/IRouterInfo.interface';
import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';

@Injectable()
export class RoleUserGuard implements CanActivate {
  constructor(private findUserById: FindUserByIdUseCase) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, routePath] = context.switchToHttp().getRequest<IRouteInfo>().route.path.split('/');

    const allowedRoles: Array<UserRole> = [UserRole.GUARDIAN, UserRole.SHELTER];

    if ('user' in request) {
      const userId = request.user.sub;
      const user = await this.findUserById.execute(userId);
      if (allowedRoles.includes(user.role) && user.role === routePath) {
        return true;
      }

      throw new ForbiddenException(
        `O usuário ${user.name}, id: ${user.id} não tem acesso a rota: ${routePath}`,
      );
    }
  }
}
