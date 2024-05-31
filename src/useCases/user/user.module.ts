import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/infra/db/entities/User.entity';

import { AuthenticationModule } from './autheticationUser/authentication.module';
import { CreateUserModule } from './createUser/createUser.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthenticationModule, CreateUserModule],
  exports: [CreateUserModule, AuthenticationModule],
})
export class UserModule {}
