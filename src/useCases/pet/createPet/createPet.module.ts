import { Module } from '@nestjs/common';
import { CreatePetController } from './controller/CreatePet.controller';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { CreatePetUseCase } from './CreatePet.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { Provide } from 'src/common/enum/provider.enum';
import { PetRepository } from 'src/repositories/implementations/Pet.repository';
import { ManagePhotoInCloudProvider } from 'src/useCases/common/ManagePhotoInCloud/SavePhotoInCloud.provider';

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
      provide: Provide.IManagePhotoInCloudInterface,
      useClass: ManagePhotoInCloudProvider,
    },
  ],
  exports: [],
})
export class CreatePetModule {}
