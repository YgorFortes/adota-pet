import { Module } from '@nestjs/common';
import { FindAllPetsController } from './controller/FindAllPets.controller';
import { FindAllPetsUseCase } from './FindAllPets.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { PetRepository } from 'src/repositories/implementations/Pet.repository';

@Module({
  imports: [],
  controllers: [FindAllPetsController],
  providers: [
    FindAllPetsUseCase,
    {
      provide: RepositoryType.IPetRepository,
      useClass: PetRepository,
    },
  ],
  exports: [],
})
export class FindAllPetsModule {}
