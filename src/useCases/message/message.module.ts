import { Module } from '@nestjs/common';
import { CreateMessageModule } from './createMessage/createMessage.module';
import { FindMessageByShelterModule } from './findMessageByShelter/FindMessageByShelter.module';

@Module({
  imports: [CreateMessageModule, FindMessageByShelterModule],
  exports: [CreateMessageModule, FindMessageByShelterModule],
})
export class MessageModule {}
