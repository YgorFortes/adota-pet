import { Module } from '@nestjs/common';
import { CreateMessageModule } from './createMessage/createMessage.module';
import { FindMessagesByShelterModule } from './findMessagesByShelter/FindMessagesByShelter.module';
import { FindMessageByIdModule } from './findMessageById/findMessageShelterById.module';
import { FindMessagesByGuardianModule } from './findMessageByGuardian/findMessagesByGuardian.module';

@Module({
  imports: [
    CreateMessageModule,
    FindMessagesByShelterModule,
    FindMessageByIdModule,
    FindMessagesByGuardianModule,
  ],
  exports: [
    CreateMessageModule,
    FindMessagesByShelterModule,
    FindMessageByIdModule,
    FindMessagesByGuardianModule,
  ],
})
export class MessageModule {}
