import { Module } from '@nestjs/common';
import { FindAllSheltersController } from './controller/FindAllShelters.controller';
import { FindAllSheltersUseCase } from './FindAllShelters.useCase';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { ShelterRepository } from 'src/repositories/implementations/Shelter.repository';

@Module({
  imports: [],
  controllers: [FindAllSheltersController],
  providers: [
    FindAllSheltersUseCase,
    {
      provide: RepositoryType.IShelterRepository,
      useClass: ShelterRepository,
    },
  ],
  exports: [FindAllSheltersUseCase],
})
export class FindAllSheltersModule {}
