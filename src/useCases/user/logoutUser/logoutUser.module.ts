import { Module } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { LogoutUserController } from './controller/LogoutUser.controller';
import { FindUserByIdModule } from '../findUserById/findUserById.module';

import { LogoutUserUseCase } from './LogoutUser.useCase';

import { tokenModule } from 'src/useCases/token/token.module';

@Module({
  imports: [FindUserByIdModule, tokenModule],
  controllers: [LogoutUserController],
  providers: [
    LogoutUserUseCase,
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [LogoutUserUseCase],
})
export class LogoutUserModule {}
