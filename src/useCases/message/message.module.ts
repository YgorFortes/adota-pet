import { Module } from '@nestjs/common';
import { CreateMessageModule } from './createMessage/createMessage.module';

@Module({
  imports: [CreateMessageModule],
  exports: [CreateMessageModule],
})
export class MessageModule {}
