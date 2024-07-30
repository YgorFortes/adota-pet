import { ICreateMessageUseCaseDto } from '../../createMessage/dtos/ICreateMessage.userCase.dto';

export interface IUpdateMessageUseCaseDto
  extends Partial<Omit<ICreateMessageUseCaseDto, 'recipientId'>> {
  guardianId?: string;
  shelterId?: string;
}
