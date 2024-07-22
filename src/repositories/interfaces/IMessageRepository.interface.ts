import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Message } from 'src/entities/Message.entity';

export interface IMessageRepository {
  findMessageById(messageId: string, shelterId: string): Promise<Message>;

  findAllMessagesByPet(
    shelterId: string,
    guardianId: string,
    petId: string,
  ): Promise<Array<Message>>;

  findMessagesByUserRole(
    pagination: IFindAllPaginationUseCaseDto,
    userRoleId: string,
    userRole: UserRole,
  ): Promise<IPagination<Message>>;

  findMessagesByGuardian(guardianId: string): Promise<Array<Message>>;

  saveMessage(message: Message): Promise<Message>;
}

export interface IUserRoleId {
  shelterId: string;
  guardianId: string;
}
