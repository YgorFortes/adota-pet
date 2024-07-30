import { Module } from '@nestjs/common';
import { CreateMessageModule } from './createMessage/createMessage.module';
import { FindMessagesByShelterModule } from './findMessagesByShelter/FindMessagesByShelter.module';
import { FindMessageByIdModule } from './findMessageById/findMessageShelterById.module';
import { FindMessagesByGuardianModule } from './findMessageByGuardian/findMessagesByGuardian.module';
import { DeleteMessageModule } from './deleteMessage/deleteMessage.module';
import { UpdateMessageModule } from './updateMessage/updateMessage.module';

@Module({
  imports: [
    CreateMessageModule,
    FindMessagesByShelterModule,
    FindMessageByIdModule,
    FindMessagesByGuardianModule,
    UpdateMessageModule,
    DeleteMessageModule,
  ],
  exports: [
    CreateMessageModule,
    FindMessagesByShelterModule,
    FindMessageByIdModule,
    FindMessagesByGuardianModule,
    UpdateMessageModule,
    DeleteMessageModule,
  ],
})
export class MessageModule {}
