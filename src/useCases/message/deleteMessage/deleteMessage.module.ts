import { Module } from '@nestjs/common';
import { DeleteMessageUseCase } from './DeleteMessage.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { MessageRepository } from 'src/repositories/implementations/Message.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    DeleteMessageUseCase,
    { provide: RepositoryType.IMessageRepository, useClass: MessageRepository },
  ],
  exports: [DeleteMessageUseCase],
})
export class DeleteMessageModule {}
