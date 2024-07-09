import { Module } from '@nestjs/common';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { CreateAdoptionContoller } from './controller/CreateAdoption.controller';
import { CreateAdoptionUseCase } from './CreateAdoption.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { AdoptionRepository } from 'src/repositories/implementations/Adoption.repository';
import { FindPetByIdModule } from 'src/useCases/pet/findPetById/findPetById.module';
import { FindGuardianByIdModule } from 'src/useCases/guardian/findGuardianById/findGuardianById.module';
import { UpdatePetModule } from 'src/useCases/pet/updatePet/updatePet.module';

@Module({
  imports: [FindUserByIdModule, FindPetByIdModule, FindGuardianByIdModule, UpdatePetModule],
  controllers: [CreateAdoptionContoller],
  providers: [
    CreateAdoptionUseCase,
    { provide: RepositoryType.IAdoptionRepository, useClass: AdoptionRepository },
  ],
  exports: [CreateAdoptionUseCase],
})
export class CreateAdoptionModule {}
