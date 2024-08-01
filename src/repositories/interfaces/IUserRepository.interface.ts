import { User } from 'src/entities/User.entity';
import { ICreateUserUseCaseDTO } from 'src/useCases/user/createUser/dtos/ICreateUser.useCase.dto';
import { UserRole } from 'src/common/enum/roleUser.enum';

export interface IUserRepository {
  save(data: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(userId: string, associantion?: UserRole): Promise<User>;
  verifyIfEmailIsUnique(email: string): Promise<boolean>;
  updateUser(userId: string, updateUserDto: IUpdateUserRepositoryDto): Promise<User>;
  deleteUser(userId: string): Promise<boolean>;
}

type OmitProperties = 'role' | 'photo';
export interface IUpdateUserRepositoryDto
  extends Partial<Omit<ICreateUserUseCaseDTO, OmitProperties>> {
  photo: string;
}
