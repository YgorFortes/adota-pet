import { Module } from '@nestjs/common';

import { UserRepository } from 'src/repositories/implementations/User.repository';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { VerifyUserGuardianUseCase } from './VerifyUserGuardian.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
    VerifyUserGuardianUseCase,
  ],

  exports: [VerifyUserGuardianUseCase],
})
export class VerifyUserGuardianModule {}
