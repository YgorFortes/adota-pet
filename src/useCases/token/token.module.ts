import { ConsoleLogger, Module } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { TokenInvalidRepository } from 'src/repositories/implementations/TokenInvalid.repository';
import { TokenUseCase } from './Token.useCase';

@Module({
  imports: [],
  controllers: [],
  providers: [
    TokenUseCase,
    ConsoleLogger,
    {
      provide: RepositoryType.ITokenInvalidRepository,
      useClass: TokenInvalidRepository,
    },
  ],
  exports: [TokenUseCase],
})
export class tokenModule {}
