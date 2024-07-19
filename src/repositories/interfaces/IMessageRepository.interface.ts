import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Message } from 'src/entities/Message.entity';

export interface IMessageRepository {
  saveMessage(message: Message): Promise<Message>;

  findMessage(messageId: string): Promise<Message>;

  findAllMessagesByPet(
    shelterId: string,
    guardianId: string,
    petId: string,
  ): Promise<Array<Message>>;

  findMessagesByShelter(
    pagination: IFindAllPaginationUseCaseDto,
    shelterId: string,
  ): Promise<IPagination<Message>>;

  findMessagesByGuardian(guardianId: string): Promise<Array<Message>>;
}
