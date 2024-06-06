import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { CreateUserController } from './controller/CreateUser.controller';
import { HashPasswordPipe } from 'src/common/pipes/HashPassword.pipe';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { CreateUserUseCase } from './CreateUser.useCase';
import { RepositoryType } from 'src/enum/repositoryType.enum';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [CreateUserController],
  providers: [
    HashPasswordPipe,
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
    CreateUserUseCase,
  ],
  exports: [CreateUserUseCase],
})
export class CreateUserModule {}
