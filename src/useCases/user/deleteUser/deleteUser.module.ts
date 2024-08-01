import { Module } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { DeleteUserUseCase } from './DeleteUser.useCase';
import { Provide } from 'src/common/enum/provider.enum';
import { ManagePhotoInCloudProvider } from 'src/useCases/common/ManagePhotoInCloud/SavePhotoInCloud.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [
    DeleteUserUseCase,
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: Provide.IManagePhotoInCloudInterface,
      useClass: ManagePhotoInCloudProvider,
    },
  ],
  exports: [DeleteUserUseCase],
})
export class DeleteUserModule {}
