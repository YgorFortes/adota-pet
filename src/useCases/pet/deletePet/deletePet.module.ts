import { Module } from '@nestjs/common';
import { DeletePetController } from './controller/DeletePet.controller';
import { DeletePetUseCase } from './DeletePet.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { PetRepository } from 'src/repositories/implementations/Pet.repository';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { Provide } from 'src/common/enum/provider.enum';
import { ManagePhotoInCloudProvider } from 'src/useCases/common/ManagePhotoInCloud/SavePhotoInCloud.provider';

@Module({
  imports: [FindUserByIdModule],
  controllers: [DeletePetController],
  providers: [
    DeletePetUseCase,
    {
      provide: RepositoryType.IPetRepository,
      useClass: PetRepository,
    },
    {
      provide: Provide.IManagePhotoInCloudInterface,
      useClass: ManagePhotoInCloudProvider,
    },
  ],
  exports: [DeletePetUseCase],
})
export class DeletePetModule {}
