import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { LogoutUserController } from './controller/LogoutUser.controller';
import { FindUserByIdModule } from '../findUserById/findUserById.module';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { LogoutUserUseCase } from './LogoutUser.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), FindUserByIdModule],
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
