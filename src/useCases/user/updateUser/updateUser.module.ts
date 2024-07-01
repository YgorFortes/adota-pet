import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { UpdateUserUseCase } from './UpdateUser.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { HashPasswordPipe } from 'src/common/pipes/HashPassword.pipe';
import { FindUserByIdModule } from '../findUserById/findUserById.module';
import { Provide } from 'src/common/enum/provider.enum';
import { SavePhotoInCloudProvider } from '../../common/savePhotoInCloud/SavePhotoInCloud.provider';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), FindUserByIdModule],
  controllers: [],
  providers: [
    UpdateUserUseCase,
    HashPasswordPipe,
    { provide: RepositoryType.IUserRepository, useClass: UserRepository },
    {
      provide: Provide.ISavePhotoInCloudInterface,
      useClass: SavePhotoInCloudProvider,
    },
  ],
  exports: [UpdateUserUseCase],
})
export class UpdateUserModule {}
