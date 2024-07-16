import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { TokenUseCase } from 'src/useCases/token/Token.useCase';

@Injectable()
export class LogoutUserUseCase {
  constructor(
    private authenticationGuard: AuthenticationGuard,
    private tokenUseCase: TokenUseCase,
  ) {}
  async execute(request: IRequestWithUser): Promise<boolean> {
    const token = this.authenticationGuard.extractTokenHeader(request);

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação.');
    }

    await this.addInvalidToken(token);

    return true;
  }

  private async addInvalidToken(token: string): Promise<void> {
    await this.tokenUseCase.saveTokenInvalid(token);
  }
}
