import { UserRole } from 'src/enum/roleUser.enum';

export interface ICreateUserDTO {
  name: string;

  email: string;

  password: string;

  role: UserRole;

  photo?: string;

  telephone: string;
}
