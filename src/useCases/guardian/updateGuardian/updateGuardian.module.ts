import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardianEntity } from 'src/infra/db/entities/Guardian.entity';
import { UpdataGuardianControle } from './controller/UpdateGuardian.controller';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { GuardianRepository } from 'src/repositories/implementations/Guardian.repostory';
import { UpdateGuardianUseCase } from './UpdateGuardian.useCase';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { UpdateUserModule } from 'src/useCases/user/updateUser/updateUser.module';
import { VerifyUserAssociationModule } from 'src/useCases/user/VerifyUserGuardian/verifyUserAssociation.module';
import { UpdateAddressModule } from 'src/useCases/address/updateAddress/updateAddress.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuardianEntity]),
    FindUserByIdModule,
    UpdateUserModule,
    VerifyUserAssociationModule,
    UpdateAddressModule,
  ],
  controllers: [UpdataGuardianControle],
  providers: [
    UpdateGuardianUseCase,
    {
      provide: RepositoryType.IGuardianRepository,
      useClass: GuardianRepository,
    },
  ],
  exports: [UpdateGuardianUseCase],
})
export class UpdateGuardianModule {}
