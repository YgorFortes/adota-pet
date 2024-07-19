import { Module } from '@nestjs/common';
import { FindMessageByShelterController } from './controller/FindMessageByShelter.controller';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { MessageRepository } from 'src/repositories/implementations/Message.repository';
import { FindMessageByShelterUseCase } from './FindMessageByShelter.useCase';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';

@Module({
  imports: [FindUserByIdModule],
  controllers: [FindMessageByShelterController],
  providers: [
    FindMessageByShelterUseCase,
    { provide: RepositoryType.IMessageRepository, useClass: MessageRepository },
  ],
  exports: [],
})
export class FindMessageByShelterModule {}
