import { Module } from '@nestjs/common';
import { DeleteGuardianController } from './controller/DeleteGuardian.controller';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { DeleteGuardianUseCase } from './DeleteGuardian.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { GuardianRepository } from 'src/repositories/implementations/Guardian.repostory';
import { VerifyUserAssociationModule } from 'src/useCases/user/VerifyUserGuardian/verifyUserAssociation.module';
import { LogoutUserModule } from 'src/useCases/user/logoutUser/logoutUser.module';
import { Provide } from 'src/common/enum/provider.enum';
import { ManagePhotoInCloudProvider } from 'src/useCases/common/ManagePhotoInCloud/SavePhotoInCloud.provider';
import { DeleteUserModule } from 'src/useCases/user/deleteUser/deleteUser.module';

@Module({
  imports: [FindUserByIdModule, VerifyUserAssociationModule, LogoutUserModule, DeleteUserModule],

  controllers: [DeleteGuardianController],
  providers: [
    DeleteGuardianUseCase,
    { provide: RepositoryType.IGuardianRepository, useClass: GuardianRepository },
    {
      provide: Provide.IManagePhotoInCloudInterface,
      useClass: ManagePhotoInCloudProvider,
    },
  ],
  exports: [DeleteGuardianUseCase],
})
export class DeleteGuardianModule {}
