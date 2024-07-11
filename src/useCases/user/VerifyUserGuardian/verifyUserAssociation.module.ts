import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { VerifyUserAssociationUseCase } from './VerifyUserAssociation.useCase';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
    VerifyUserAssociationUseCase,
  ],

  exports: [VerifyUserAssociationUseCase],
})
export class VerifyUserAssociationModule {}
