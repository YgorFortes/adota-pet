import { Module } from '@nestjs/common';
import { DeleteShelterController } from './controller/DeleteShelter.controller';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { ShelterRepository } from 'src/repositories/implementations/Shelter.repository';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { DeleteShelterUseCase } from './DeleteShelter.useCase';
import { LogoutUserModule } from 'src/useCases/user/logoutUser/logoutUser.module';

@Module({
  imports: [FindUserByIdModule, LogoutUserModule],
  controllers: [DeleteShelterController],
  providers: [
    DeleteShelterUseCase,
    { provide: RepositoryType.IShelterRepository, useClass: ShelterRepository },
  ],
  exports: [],
})
export class DeleteShelterModule {}
