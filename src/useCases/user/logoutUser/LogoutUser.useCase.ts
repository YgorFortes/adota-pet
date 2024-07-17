import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenUseCase } from 'src/useCases/token/Token.useCase';

@Injectable()
export class LogoutUserUseCase {
  constructor(private tokenUseCase: TokenUseCase) {}
  async execute(token: string): Promise<boolean> {
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
