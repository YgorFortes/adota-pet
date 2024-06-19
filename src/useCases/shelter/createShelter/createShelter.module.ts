import { Module } from '@nestjs/common';
import { CreateShelterController } from './controller/CreateShelter.controller';
import { CreateShelterUseCase } from './CreateShelter.useCase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterEntity } from 'src/infra/db/entities/Shelter.entity';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { ShelterRepository } from 'src/repositories/implementations/Shelter.repository';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { VerifyUserAssociationModule } from 'src/useCases/user/VerifyUserGuardian/verifyUserAssociation.module';
import { CreateAddressModule } from 'src/useCases/address/createAddress/createArdress.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShelterEntity]),
    FindUserByIdModule,
    VerifyUserAssociationModule,
    CreateAddressModule,
  ],
  controllers: [CreateShelterController],
  providers: [
    CreateShelterUseCase,
    {
      provide: RepositoryType.IShelterRepository,
      useClass: ShelterRepository,
    },
  ],
  exports: [],
})
export class CreateShelterModule {}
