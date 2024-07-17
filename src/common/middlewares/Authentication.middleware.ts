import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';
import { TokenUseCase } from 'src/useCases/token/Token.useCase';
import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';
import { IPayLoad } from '../interfaces/IPayLoad.interface';
import { extractTokenHeader } from '../helpers/extractToken.helpers';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private tokenUseCase: TokenUseCase,
  ) {}

  async use(request: IRequestWithUser, response: Response, next: NextFunction): Promise<void> {
    const token = extractTokenHeader(request);

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

    return next();
  }
}
