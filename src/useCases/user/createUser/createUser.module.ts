import { Module } from '@nestjs/common';
import { CreateUserController } from './controller/CreateUser.controller';
import { HashPasswordPipe } from 'src/common/pipes/HashPassword.pipe';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { CreateUserUseCase } from './CreateUser.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { Provide } from 'src/common/enum/provider.enum';
import { ManagePhotoInCloudProvider } from 'src/useCases/common/ManagePhotoInCloud/SavePhotoInCloud.provider';
import { CreateGuardianModule } from 'src/useCases/guardian/createGuardian/createGuardian.module';
import { CreateShelterModule } from 'src/useCases/shelter/createShelter/createShelter.module';
import { CreateAddressModule } from 'src/useCases/address/createAddress/createArdress.module';

@Module({
  imports: [CreateGuardianModule, CreateShelterModule, CreateAddressModule],
  controllers: [CreateUserController],
  providers: [
    HashPasswordPipe,
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: Provide.IManagePhotoInCloudInterface,
      useClass: ManagePhotoInCloudProvider,
    },
    CreateUserUseCase,
  ],
  exports: [CreateUserUseCase],
})
export class CreateUserModule {}
