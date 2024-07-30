import { Module } from '@nestjs/common';
import { UpdateMessageUseCase } from './UpdateMessage.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { MessageRepository } from 'src/repositories/implementations/Message.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UpdateMessageUseCase,
    { provide: RepositoryType.IMessageRepository, useClass: MessageRepository },
  ],
  exports: [UpdateMessageUseCase],
})
export class UpdateMessageModule {}
