import { Module } from '@nestjs/common';
import { FindMessagesByShelterController } from './controller/FindMessagesByShelter.controller';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { MessageRepository } from 'src/repositories/implementations/Message.repository';
import { FindMessagesByShelterUseCase } from './FindMessagesByShelter.useCase';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';

@Module({
  imports: [FindUserByIdModule],
  controllers: [FindMessagesByShelterController],
  providers: [
    FindMessagesByShelterUseCase,
    { provide: RepositoryType.IMessageRepository, useClass: MessageRepository },
  ],
  exports: [FindMessagesByShelterUseCase],
})
export class FindMessagesByShelterModule {}
