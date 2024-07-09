import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { UserRole } from 'src/common/enum/roleUser.enum';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';

import { IRouteInfo } from '../interfaces/IRouterInfo.interface';
import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';
import { userAssociation } from '../enum/userAssociation.enum';

@Injectable()
export class ShelterPermition implements CanActivate {
  constructor(private findUserById: FindUserByIdUseCase) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, routePath] = context.switchToHttp().getRequest<IRouteInfo>().route.path.split('/');

    if ('user' in request) {
      const userId = request.user.sub;
      const user = await this.findUserById.execute(userId, userAssociation.SHELTER);

      if (user.role === UserRole.SHELTER && user.shelter) {
        return true;
      }

      throw new ForbiddenException(
        `O usuário ${user.name}, id: ${user.id} não tem acesso a rota: GET ${routePath}`,
      );
    }
  }
}
