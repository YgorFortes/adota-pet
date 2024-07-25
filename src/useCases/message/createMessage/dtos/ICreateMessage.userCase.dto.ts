import { UserRole } from 'src/common/enum/roleUser.enum';

export interface ICreateMessageUseCaseDto {
  content: string;
  recipientId: string;
  petId: string;
  role: UserRole;
}
