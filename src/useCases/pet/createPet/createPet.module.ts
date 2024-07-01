import { Module } from '@nestjs/common';
import { CreatePetController } from './controller/CreatePet.controller';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { CreatePetUseCase } from './CreatePet.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { Provide } from 'src/common/enum/provider.enum';
import { SavePhotoInCoudProvider } from 'src/useCases/common/savePhotoInCloud/SavePhotoInCloud.provider';
import { PetRepository } from 'src/repositories/implementations/Pet.repository';

@Module({
  imports: [FindUserByIdModule],
  controllers: [CreatePetController],
  providers: [
    CreatePetUseCase,
    {
      provide: RepositoryType.IPetRepository,
      useClass: PetRepository,
    },
    {
      provide: Provide.ISavePhotoInCoudInterface,
      useClass: SavePhotoInCoudProvider,
    },
  ],
  exports: [],
})
export class CreatePetModule {}
