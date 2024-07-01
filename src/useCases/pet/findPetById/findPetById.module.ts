import { Module } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { PetRepository } from 'src/repositories/implementations/Pet.repository';
import { FindPetByIdController } from './controller/FindPetById.controller';
import { FindPetByIdUseCase } from './FindPetById.useCase';

@Module({
  imports: [],
  controllers: [FindPetByIdController],
  providers: [
    FindPetByIdUseCase,
    {
      provide: RepositoryType.IPetRepository,
      useClass: PetRepository,
    },
  ],
  exports: [FindPetByIdUseCase],
})
export class FindPetByIdModule {}
