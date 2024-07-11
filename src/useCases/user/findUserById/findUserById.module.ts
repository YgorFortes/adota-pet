import { Module } from '@nestjs/common';
import { FindUserByIdUseCase } from './FindUserById.useCase';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
    FindUserByIdUseCase,
  ],

  exports: [FindUserByIdUseCase],
})
export class FindUserByIdModule {}
