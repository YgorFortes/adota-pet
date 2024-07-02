import { Module } from '@nestjs/common';
import { UpdatePetController } from './controller/UpdatePet.controller';
import { UpdatePetUseCase } from './UpdatePet.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { PetRepository } from 'src/repositories/implementations/Pet.repository';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { Provide } from 'src/common/enum/provider.enum';
import { SavePhotoInCloudProvider } from 'src/useCases/common/savePhotoInCloud/SavePhotoInCloud.provider';

@Module({
  imports: [FindUserByIdModule],
  controllers: [UpdatePetController],
  providers: [
    UpdatePetUseCase,
    {
      provide: RepositoryType.IPetRepository,
      useClass: PetRepository,
    },
    {
      provide: Provide.ISavePhotoInCloudInterface,
      useClass: SavePhotoInCloudProvider,
    },
  ],
  exports: [UpdatePetUseCase],
})
export class UpdatePetModule {}
