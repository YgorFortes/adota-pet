import { Message } from 'src/entities/Message.entity';

export interface IMessageRepository {
  saveMessage(message: Message): Promise<boolean>;
  findMessage(messageId: string): Promise<Message>;
  findAllMessagesByPet(
    shelterId: string,
    guardianId: string,
    petId: string,
  ): Promise<Array<Message>>;

  findMessagesByGuardian(guardianId: string): Promise<Array<Message>>;
}
