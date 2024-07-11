import { Module } from '@nestjs/common';
import { UpdateUserUseCase } from './UpdateUser.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { HashPasswordPipe } from 'src/common/pipes/HashPassword.pipe';
import { FindUserByIdModule } from '../findUserById/findUserById.module';
import { Provide } from 'src/common/enum/provider.enum';
import { ManagePhotoInCloudProvider } from 'src/useCases/common/ManagePhotoInCloud/SavePhotoInCloud.provider';

@Module({
  imports: [FindUserByIdModule],
  controllers: [],
  providers: [
    UpdateUserUseCase,
    HashPasswordPipe,
    { provide: RepositoryType.IUserRepository, useClass: UserRepository },
    {
      provide: Provide.IManagePhotoInCloudInterface,
      useClass: ManagePhotoInCloudProvider,
    },
  ],
  exports: [UpdateUserUseCase],
})
export class UpdateUserModule {}
