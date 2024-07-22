import { Module } from '@nestjs/common';
import { CreateMessageModule } from './createMessage/createMessage.module';
import { FindMessagesByShelterModule } from './findMessagesByShelter/FindMessagesByShelter.module';
import { FindMessageByIdModule } from './findMessageById/findMessageShelterById.module';
import { FindMessageByGuardianModule } from './findMessageByGuardian/findMessagesByGuardian.module';

@Module({
  imports: [
    CreateMessageModule,
    FindMessagesByShelterModule,
    FindMessageByIdModule,
    FindMessageByGuardianModule,
  ],
  exports: [
    CreateMessageModule,
    FindMessagesByShelterModule,
    FindMessageByIdModule,
    FindMessageByGuardianModule,
  ],
})
export class MessageModule {}
