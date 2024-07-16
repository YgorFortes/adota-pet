import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';
import { IPayLoad } from '../interfaces/IPayLoad.interface';

import { TokenUseCase } from 'src/useCases/token/Token.useCase';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private tokenUseCase: TokenUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    const token = this.extractTokenHeader(request);

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação.');
    }

    await this.tokenUseCase.verifyTokenIsValid(token);

    try {
      const payload: IPayLoad = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('JTW inválido');
    }

    return true;
  }

  public extractTokenHeader(request: Request): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
