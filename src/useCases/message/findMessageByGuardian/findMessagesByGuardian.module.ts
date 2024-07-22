import { Module } from '@nestjs/common';
import { FindMessagesByGuardianController } from './controller/FindMessagesByGuardian.controller';
import { FindMessagesByGuardianUseCase } from './FindMessagesByGuardian.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { MessageRepository } from 'src/repositories/implementations/Message.repository';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';

@Module({
  imports: [FindUserByIdModule],
  controllers: [FindMessagesByGuardianController],
  providers: [
    FindMessagesByGuardianUseCase,
    { provide: RepositoryType.IMessageRepository, useClass: MessageRepository },
  ],
  exports: [FindMessagesByGuardianUseCase],
})
export class FindMessagesByGuardianModule {}
