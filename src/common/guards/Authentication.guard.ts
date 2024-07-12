import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';
import { IPayLoad } from '../interfaces/IPayLoad.interface';
import { schedule } from 'node-cron';
import { timeIntervals } from 'src/common/enum/timeIntervals.enum';
import { RepositoryType } from '../enum/repositoryType.enum';
import { ITokenInvalidRepository } from 'src/repositories/interfaces/ITokenInvalidRepository.interface';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(RepositoryType.ITokenInvalidRepository)
    private tokenRepository: ITokenInvalidRepository,
  ) {
    schedule(timeIntervals.EVERY_3_DAYS_AT_9AM, () => {
      console.log('invalids tokens deleted');
      this.removeTokenInvalids();
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    const token = this.extractTokenHeader(request);

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação.');
    }

    this.verifyTokenIsValid(token);

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

  private async verifyTokenIsValid(token: string): Promise<void> {
    const tokens = await this.tokenRepository.findAll();
    const tokensInvalids = tokens.map(tableToken => tableToken.token);

    if (tokensInvalids.includes(token)) {
      throw new UnauthorizedException('Token invalido.');
    }
  }

  private removeTokenInvalids(): void {
    this.tokenRepository.deleteAllTokensInvalids();
  }
}
