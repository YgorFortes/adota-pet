import { UserRole } from 'src/enum/roleUser.enum';

export interface ICreateUserUseCaseDTO {
  name: string;

  email: string;

  password: string;

  role: UserRole;

  photo?: string;

  telephone: string;
}
