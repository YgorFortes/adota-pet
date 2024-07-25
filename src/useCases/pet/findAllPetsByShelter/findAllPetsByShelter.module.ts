import { Module } from '@nestjs/common';
import { FindAllPetsByShelterUseCase } from './FindAllPetsByShelter.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { PetRepository } from 'src/repositories/implementations/Pet.repository';
import { FindAllPetsByShelterController } from './controller/FindAllPetsByShelter.controller';

@Module({
  imports: [],
  controllers: [FindAllPetsByShelterController],
  providers: [
    FindAllPetsByShelterUseCase,
    {
      provide: RepositoryType.IPetRepository,
      useClass: PetRepository,
    },
  ],
  exports: [FindAllPetsByShelterUseCase],
})
export class FindAllPetsByShelterModule {}
