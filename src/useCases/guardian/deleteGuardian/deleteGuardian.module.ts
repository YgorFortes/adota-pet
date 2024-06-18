import { Module } from '@nestjs/common';
import { DeleteGuardianController } from './controller/DeleteGuardian.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardianEntity } from 'src/infra/db/entities/Guardian.entity';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { DeleteGuardianUseCase } from './DeleteGuardian.useCase';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { GuardianRepository } from 'src/repositories/implementations/Guardian.repostory';
import { VerifyUserAssociationModule } from 'src/useCases/user/VerifyUserGuardian/verifyUserAssociation.module';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { LogoutUserModule } from 'src/useCases/user/logoutUser/logoutUser.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuardianEntity]),
    FindUserByIdModule,
    VerifyUserAssociationModule,
    LogoutUserModule,
  ],

  controllers: [DeleteGuardianController],
  providers: [
    DeleteGuardianUseCase,
    AuthenticationGuard,
    { provide: RepositoryType.IGuardianRepository, useClass: GuardianRepository },
  ],
  exports: [DeleteGuardianUseCase],
})
export class DeleteGuardianModule {}
