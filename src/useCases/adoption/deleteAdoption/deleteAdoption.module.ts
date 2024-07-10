import { Module } from '@nestjs/common';
import { DeleteAdoptionController } from './controller/DeleteAdoption.controller';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { DeleteAdoptionUseCase } from './DeleteAdoption.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { AdoptionRepository } from 'src/repositories/implementations/Adoption.repository';
import { UpdatePetModule } from 'src/useCases/pet/updatePet/updatePet.module';

@Module({
  imports: [FindUserByIdModule, UpdatePetModule],
  controllers: [DeleteAdoptionController],
  providers: [
    DeleteAdoptionUseCase,
    {
      provide: RepositoryType.IAdoptionRepository,
      useClass: AdoptionRepository,
    },
  ],
  exports: [DeleteAdoptionUseCase],
})
export class DeleteAdoptionModule {}
