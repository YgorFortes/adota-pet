import { ConsoleLogger, Inject, UnauthorizedException } from '@nestjs/common';
import { schedule } from 'node-cron';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { timeIntervals } from 'src/common/enum/timeIntervals.enum';
import { TokenInvalid } from 'src/entities/TokenInvalid.entity';
import { ITokenInvalidRepository } from 'src/repositories/interfaces/ITokenInvalidRepository.interface';

export class TokenUseCase {
  private methodCalled: boolean = false;
  constructor(
    @Inject(RepositoryType.ITokenInvalidRepository)
    private tokenRepository: ITokenInvalidRepository,
    private logger: ConsoleLogger,
  ) {
    this.removeTokenInvalids();
  }

  public async verifyTokenIsValid(token: string): Promise<void> {
    const tokens = await this.tokenRepository.findAll();
    const tokensInvalids = tokens.map(tableToken => tableToken.token);

    if (tokensInvalids.includes(token)) {
      throw new UnauthorizedException('Token invalido.');
    }
  }

  public removeTokenInvalids(): void {
    try {
      if (!this.methodCalled) {
        schedule(timeIntervals.EVERY_3_DAYS_AT_9AM, async () => {
          this.logger.log('Tokens invalids have been deletead');

          await this.tokenRepository.deleteAllTokensInvalids();
        });
      }
    } catch (error) {
      console.log(error);
    }

    this.methodCalled = true;
  }

  public async saveTokenInvalid(token: string): Promise<void> {
    const tokenEntity = new TokenInvalid({ token });
    await this.tokenRepository.saveTokenInvalid(tokenEntity);
  }
}
