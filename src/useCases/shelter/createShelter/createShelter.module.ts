import { Module } from '@nestjs/common';
import { CreateShelterController } from './controller/CreateShelter.controller';
import { CreateShelterUseCase } from './CreateShelter.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { ShelterRepository } from 'src/repositories/implementations/Shelter.repository';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { VerifyUserAssociationModule } from 'src/useCases/user/VerifyUserGuardian/verifyUserAssociation.module';
import { CreateAddressModule } from 'src/useCases/address/createAddress/createArdress.module';

@Module({
  imports: [FindUserByIdModule, VerifyUserAssociationModule, CreateAddressModule],
  controllers: [CreateShelterController],
  providers: [
    CreateShelterUseCase,
    {
      provide: RepositoryType.IShelterRepository,
      useClass: ShelterRepository,
    },
  ],
  exports: [],
})
export class CreateShelterModule {}
