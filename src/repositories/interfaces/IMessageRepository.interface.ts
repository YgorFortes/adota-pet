import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Message } from 'src/entities/Message.entity';

export interface IReferenceIds {
  guardianId?: string | null;
  shelterId?: string | null;
  petId?: string | null;
}

export interface IMessageRepository {
  findMessageById(messageId: string, shelterId?: string): Promise<Message>;

  findMessagesByUserRole(
    pagination: IFindAllPaginationUseCaseDto,
    userRoleId: string,
    userRole: UserRole,
  ): Promise<IPagination<Message>>;

  updateMessage(referenceIds: IReferenceIds, updateShelterDto: unknown): Promise<boolean>;

  saveMessage(message: Message): Promise<Message>;

  softDeleteMessage(messageId: string): Promise<boolean>;
}
