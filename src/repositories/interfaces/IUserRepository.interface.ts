import { User } from 'src/entities/User.entity';
import { userAssociation } from 'src/common/enum/userAssociation.enum';
import { ICreateUserUseCaseDTO } from 'src/useCases/user/createUser/dtos/ICreateUser.useCase.dto';

export interface IUserRepository {
  save(data: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(userId: string, associantion?: userAssociation): Promise<User>;
  verifyIfEmailIsUnique(email: string): Promise<boolean>;
  updateUser(userId: string, updateUserDto: IUpdateUserRepositoryDto): Promise<User>;
}

type OmitProperties = 'role' | 'photo';
export interface IUpdateUserRepositoryDto
  extends Partial<Omit<ICreateUserUseCaseDTO, OmitProperties>> {
  photo: string;
}
