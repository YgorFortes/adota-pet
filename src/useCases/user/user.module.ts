import { Module } from '@nestjs/common';
import { AuthenticationModule } from './autheticationUser/authentication.module';
import { CreateUserModule } from './createUser/createUser.module';
import { LogoutUserModule } from './logoutUser/logoutUser.module';
import { FindUserByIdModule } from './findUserById/findUserById.module';
import { FindUserByEmailModule } from './findEmailByEmail/findUserByEmail.module';
import { UpdateUserModule } from './updateUser/updateUser.module';
import { VerifyUserAssociationModule } from './VerifyUserGuardian/verifyUserAssociation.module';

@Module({
  imports: [
    AuthenticationModule,
    CreateUserModule,
    LogoutUserModule,
    FindUserByIdModule,
    FindUserByEmailModule,
    UpdateUserModule,
    VerifyUserAssociationModule,
  ],
  exports: [
    AuthenticationModule,
    CreateUserModule,
    LogoutUserModule,
    FindUserByIdModule,
    FindUserByEmailModule,
    UpdateUserModule,
    VerifyUserAssociationModule,
  ],
})
export class UserModule {}
