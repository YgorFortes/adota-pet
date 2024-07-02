import { Module } from '@nestjs/common';
import { DeletePetController } from './controller/DeletePetController';
import { DeletePetUseCase } from './DeletePet.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { PetRepository } from 'src/repositories/implementations/Pet.repository';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';

@Module({
  imports: [FindUserByIdModule],
  controllers: [DeletePetController],
  providers: [
    DeletePetUseCase,
    {
      provide: RepositoryType.IPetRepository,
      useClass: PetRepository,
    },
  ],
  exports: [],
})
export class DeletePetModule {}
