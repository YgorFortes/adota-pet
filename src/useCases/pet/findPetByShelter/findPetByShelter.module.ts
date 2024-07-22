import { Module } from '@nestjs/common';
import { FindPetByShelterController } from './controller/FindPetByShelter.controller';
import { FindPetByShelterUseCase } from './FindPetByShelter.useCase';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { PetRepository } from 'src/repositories/implementations/Pet.repository';

@Module({
  imports: [FindUserByIdModule],
  controllers: [FindPetByShelterController],
  providers: [
    FindPetByShelterUseCase,
    {
      provide: RepositoryType.IPetRepository,
      useClass: PetRepository,
    },
  ],
  exports: [FindUserByIdModule],
})
export class FindPetByShelterModule {}
