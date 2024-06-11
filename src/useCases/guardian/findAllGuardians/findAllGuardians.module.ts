import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardianEntity } from 'src/infra/db/entities/Guardian.entity';
import { FindAllGuardiansController } from './controller/FindAllGuardians.controller';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { GuardianRepository } from 'src/repositories/implementations/Guardian.repostory';
import { FindAllGuardiansUseCase } from './FindAllGuardians.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([GuardianEntity])],
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
