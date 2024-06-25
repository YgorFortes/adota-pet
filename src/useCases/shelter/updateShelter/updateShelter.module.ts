import { Module } from '@nestjs/common';
import { UpdateShelterController } from './controller/UpdateShelter.controller';
import { UpdateShelterUseCase } from './UpdateShelter.useCase';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { ShelterRepository } from 'src/repositories/implementations/Shelter.repository';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { UpdateUserModule } from 'src/useCases/user/updateUser/updateUser.module';
import { UpdateAddressModule } from 'src/useCases/address/updateAddress/updateAddress.module';
import { VerifyUserAssociationModule } from 'src/useCases/user/VerifyUserGuardian/verifyUserAssociation.module';

@Module({
  imports: [FindUserByIdModule, UpdateUserModule, UpdateAddressModule, VerifyUserAssociationModule],
  controllers: [UpdateShelterController],
  providers: [
    UpdateShelterUseCase,
    {
      provide: RepositoryType.IShelterRepository,
      useClass: ShelterRepository,
    },
  ],
  exports: [UpdateShelterUseCase],
})
export class UpdateShelterModule {}
