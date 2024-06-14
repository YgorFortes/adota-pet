import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardianEntity } from 'src/infra/db/entities/Guardian.entity';
import { GuardianRepository } from 'src/repositories/implementations/Guardian.repostory';
import { CreateGuardianUseCase } from 'src/useCases/guardian/createGuardian/CreateGuardian.userCase';

import { CreateGuadianController } from './controller/CreateGuardian.controller';
import { RepositoryType } from 'src/enum/repositoryType.enum';

import { CreateAddressModule } from 'src/useCases/address/createAddress/createArdress.module';
import { VerifyUserAssociationModule } from 'src/useCases/user/VerifyUserGuardian/verifyUserAssociation.module';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuardianEntity]),
    VerifyUserAssociationModule,
    CreateAddressModule,
    FindUserByIdModule,
  ],
  controllers: [CreateGuadianController],
  providers: [
    CreateGuardianUseCase,
    { provide: RepositoryType.IGuardianRepository, useClass: GuardianRepository },
  ],
  exports: [CreateGuardianUseCase],
})
export class CreateGuardianModule {}
