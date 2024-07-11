import { Module } from '@nestjs/common';
import { GuardianRepository } from 'src/repositories/implementations/Guardian.repostory';
import { CreateGuardianUseCase } from 'src/useCases/guardian/createGuardian/CreateGuardian.userCase';

import { CreateGuadianController } from './controller/CreateGuardian.controller';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';

import { CreateAddressModule } from 'src/useCases/address/createAddress/createArdress.module';
import { VerifyUserAssociationModule } from 'src/useCases/user/VerifyUserGuardian/verifyUserAssociation.module';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';

@Module({
  imports: [VerifyUserAssociationModule, CreateAddressModule, FindUserByIdModule],
  controllers: [CreateGuadianController],
  providers: [
    CreateGuardianUseCase,
    { provide: RepositoryType.IGuardianRepository, useClass: GuardianRepository },
  ],
  exports: [CreateGuardianUseCase],
})
export class CreateGuardianModule {}
