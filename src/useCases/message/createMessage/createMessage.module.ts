import { Module } from '@nestjs/common';
import { CreateMessageUseCase } from './CreateMessage.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { MessageRepository } from 'src/repositories/implementations/Message.repository';
import { FindShelterByIdModule } from 'src/useCases/shelter/findShelterById/findShelterById.module';
import { FindPetByIdModule } from 'src/useCases/pet/findPetById/findPetById.module';
import { CreateMessageController } from './controller/CreateMessage.controller';
import { FindUserByIdModule } from 'src/useCases/user/findUserById/findUserById.module';
import { Provide } from 'src/common/enum/provider.enum';
import { ManageEmailProvide } from '../sendEmail/ManageEmail.provide';

@Module({
  imports: [FindUserByIdModule, FindShelterByIdModule, FindPetByIdModule],
  controllers: [CreateMessageController],
  providers: [
    CreateMessageUseCase,
    { provide: RepositoryType.IMessageRepository, useClass: MessageRepository },
    { provide: Provide.IManageEmailInterface, useClass: ManageEmailProvide },
  ],
  exports: [CreateMessageUseCase],
})
export class CreateMessageModule {}
