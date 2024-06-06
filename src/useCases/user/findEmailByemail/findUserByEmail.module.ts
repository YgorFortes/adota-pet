import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { FindUserByEmailUseCase } from './FindUserByEmail.useCase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/db/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
    FindUserByEmailUseCase,
  ],
  exports: [FindUserByEmailUseCase],
})
export class FindUserByEmailModule {}
