import { Module } from '@nestjs/common';
import { DeleteShelterController } from './controller/DeleteShelter.controller';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { ShelterRepository } from 'src/repositories/implementations/Shelter.repository';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { DeleteShelterUseCase } from './DeleteShelter.useCase';
import { LogoutUserModule } from 'src/useCases/user/logoutUser/logoutUser.module';
import { Provide } from 'src/common/enum/provider.enum';
import { ManagePhotoInCloudProvider } from 'src/useCases/common/ManagePhotoInCloud/SavePhotoInCloud.provider';
import { DeleteUserModule } from 'src/useCases/user/deleteUser/deleteUser.module';

@Module({
  imports: [FindUserByIdModule, LogoutUserModule, DeleteUserModule],
  controllers: [DeleteShelterController],
  providers: [
    DeleteShelterUseCase,
    { provide: RepositoryType.IShelterRepository, useClass: ShelterRepository },
    {
      provide: Provide.IManagePhotoInCloudInterface,
      useClass: ManagePhotoInCloudProvider,
    },
  ],
  exports: [DeleteShelterUseCase],
})
export class DeleteShelterModule {}
