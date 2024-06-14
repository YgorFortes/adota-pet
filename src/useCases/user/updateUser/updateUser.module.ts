import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { UpdateUserUseCase } from './UpdateUser.useCase';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { HashPasswordPipe } from 'src/common/pipes/HashPassword.pipe';
import { FindUserByIdModule } from '../findUserById/findUserById.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), FindUserByIdModule],
  controllers: [],
  providers: [
    UpdateUserUseCase,
    HashPasswordPipe,
    { provide: RepositoryType.IUserRepository, useClass: UserRepository },
  ],
  exports: [UpdateUserUseCase],
})
export class UpdateUserModule {}
