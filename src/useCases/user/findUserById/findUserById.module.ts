import { Module } from '@nestjs/common';
import { FindUserByIdUseCase } from './FindUserById.useCase';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
    FindUserByIdUseCase,
  ],

  exports: [FindUserByIdUseCase],
})
export class FindUserByIdModule {}
