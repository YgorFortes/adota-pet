import { UserRole } from 'src/common/enum/roleUser.enum';
import { IImageFile } from './IImageFile';

export interface ICreateUserUseCaseDTO {
  name: string;

  email: string;

  password: string;

  role: UserRole;

  photo: IImageFile;

  telephone: string;
}
