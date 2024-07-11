import { Module } from '@nestjs/common';
import { FindAllGuardiansController } from './controller/FindAllGuardians.controller';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { GuardianRepository } from 'src/repositories/implementations/Guardian.repostory';
import { FindAllGuardiansUseCase } from './FindAllGuardians.useCase';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';

@Module({
  imports: [FindUserByIdModule],
  controllers: [FindAllGuardiansController],
  providers: [
    FindAllGuardiansUseCase,
    {
      provide: RepositoryType.IGuardianRepository,
      useClass: GuardianRepository,
    },
  ],
  exports: [FindAllGuardiansUseCase],
})
export class FindAllGuardiansModule {}
