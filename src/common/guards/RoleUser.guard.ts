import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { IRouteInfo } from '../interfaces/IRouterInfo.interface';
import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';
import { userAssociation } from '../enum/userAssociation.enum';
import { IUserWithAssociation } from '../interfaces/IUserWithAssociation';

@Injectable()
export class RoleUserGuard implements CanActivate {
  constructor(private findUserById: FindUserByIdUseCase) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, routePath] = context.switchToHttp().getRequest<IRouteInfo>().route.path.split('/');
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
      return true;
    }

    const hasValidAssociation = await this.hasValidAssociation(user);

    if (hasValidAssociation) {
      return true;
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
    const associationType =
      user.role === UserRole.GUARDIAN ? userAssociation.GUARDIAN : userAssociation.SHELTER;

    const association = await this.findUserById.execute(user.id, associationType);

    return user.role === UserRole.GUARDIAN ? !!association['guardian'] : !!association['shelter'];
  }
}
