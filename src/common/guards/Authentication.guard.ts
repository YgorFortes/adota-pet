import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IPayLoad } from 'src/useCases/user/autheticationUser/AuthenticationUser.useCase';

export interface RequestWithUser extends Request {
  user: IPayLoad;
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractTokenHeader(request);

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação.');
    }

    try {
      const payload: IPayLoad = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('JTW inválido');
    }

    return true;
  }

  private extractTokenHeader(request: Request): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
