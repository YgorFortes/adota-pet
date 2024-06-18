import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';

@Injectable()
export class LogoutUserUseCase {
  constructor(private authenticationGuard: AuthenticationGuard) {}
  async execute(request: IRequestWithUser): Promise<boolean> {
    const token = this.authenticationGuard.extractTokenHeader(request);

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação.');
    }

    this.addInvalidToken(token);

    return true;
  }

  public addInvalidToken(token: string): void {
    AuthenticationGuard.tokensInvalids.push(token);
  }
}
