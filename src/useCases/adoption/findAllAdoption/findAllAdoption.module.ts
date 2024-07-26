import { Module } from '@nestjs/common';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { FindAllAdoptionUseCase } from './FindAllAdoption.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { AdoptionRepository } from 'src/repositories/implementations/Adoption.repository';
import { FindAllAdoptionController } from './controller/FindAllAdoption.controller';

@Module({
  imports: [FindUserByIdModule],
  controllers: [FindAllAdoptionController],
  providers: [
    FindAllAdoptionUseCase,
    { provide: RepositoryType.IAdoptionRepository, useClass: AdoptionRepository },
  ],
  exports: [FindAllAdoptionUseCase],
})
export class FindAllAdoptionModule {}
