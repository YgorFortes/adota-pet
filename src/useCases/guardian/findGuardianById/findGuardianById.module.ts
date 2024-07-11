import { Module } from '@nestjs/common';
import { FindGuardianByIdController } from './controller/FindGuardianById.controller';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { GuardianRepository } from 'src/repositories/implementations/Guardian.repostory';
import { FindGuardianByIdUseCase } from './FindGuardianById.useCase';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';

@Module({
  imports: [FindUserByIdModule],
  controllers: [FindGuardianByIdController],
  providers: [
    FindGuardianByIdUseCase,
    { provide: RepositoryType.IGuardianRepository, useClass: GuardianRepository },
  ],
  exports: [FindGuardianByIdUseCase],
})
export class FindGuardianByIdModule {}
