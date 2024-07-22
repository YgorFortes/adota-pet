import { Module } from '@nestjs/common';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { FindMessageShelterByIdController } from './controller/FindMessageShelterById.controller';
import { FindMessageByIdUserCase } from './FindMessageShelterById.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { MessageRepository } from 'src/repositories/implementations/Message.repository';

@Module({
  imports: [FindUserByIdModule],
  controllers: [FindMessageShelterByIdController],
  providers: [
    FindMessageByIdUserCase,
    { provide: RepositoryType.IMessageRepository, useClass: MessageRepository },
  ],
  exports: [FindMessageByIdUserCase],
})
export class FindMessageByIdModule {}
