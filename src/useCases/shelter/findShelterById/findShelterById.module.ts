import { Module } from '@nestjs/common';
import { FindShelterByIdController } from './controller/FindShelterById.controller';
import { FindShelterByIdUseCase } from './FindShelterById.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { ShelterRepository } from 'src/repositories/implementations/Shelter.repository';

@Module({
  imports: [],
  controllers: [FindShelterByIdController],
  providers: [
    FindShelterByIdUseCase,
    { provide: RepositoryType.IShelterRepository, useClass: ShelterRepository },
  ],
  exports: [FindShelterByIdUseCase],
})
export class FindShelterByIdModule {}
