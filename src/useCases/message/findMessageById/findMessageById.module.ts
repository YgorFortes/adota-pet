import { Module } from '@nestjs/common';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { FindMessageByIdController } from './controller/FindMessageById.controller';
import { FindMessageByIdUserCase } from './FindMessageById.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { MessageRepository } from 'src/repositories/implementations/Message.repository';

@Module({
  imports: [FindUserByIdModule],
  controllers: [FindMessageByIdController],
  providers: [
    FindMessageByIdUserCase,
    { provide: RepositoryType.IMessageRepository, useClass: MessageRepository },
  ],
  exports: [FindMessageByIdUserCase],
})
export class FindMessageByIdModule {}
