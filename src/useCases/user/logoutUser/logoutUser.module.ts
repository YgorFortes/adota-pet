import { Module } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { LogoutUserController } from './controller/LogoutUser.controller';
import { FindUserByIdModule } from '../findUserById/findUserById.module';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { LogoutUserUseCase } from './LogoutUser.useCase';

@Module({
  imports: [FindUserByIdModule],
  controllers: [LogoutUserController],
  providers: [
    AuthenticationGuard,
    LogoutUserUseCase,
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [LogoutUserUseCase],
})
export class LogoutUserModule {}
