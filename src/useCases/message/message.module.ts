import { Module } from '@nestjs/common';
import { CreateMessageModule } from './createMessage/createMessage.module';
import { FindMessagesByShelterModule } from './findMessagesByShelter/FindMessagesByShelter.module';
import { FindMessageByIdModule } from './findMessageById/findMessageById.module';

@Module({
  imports: [CreateMessageModule, FindMessagesByShelterModule, FindMessageByIdModule],
  exports: [CreateMessageModule, FindMessagesByShelterModule, FindMessageByIdModule],
})
export class MessageModule {}
