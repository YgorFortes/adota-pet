import { User } from 'src/entities/User.entity';
import { userAssociation } from 'src/enum/userAssociation.enum';
import { ICreateUserUseCaseDTO } from 'src/useCases/user/createUser/dtos/ICreateUser.useCase.dto';
import { IUpdateUserUseCaseDto } from 'src/useCases/user/updateUser/dtos/IUpdateUser.useCase.dto';

export interface IUserRepository {
  save(data: ICreateUserUseCaseDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(userId: string, associantion?: userAssociation): Promise<User>;
  verifyIfEmailIsUnique(email: string): Promise<boolean>;
  updateUser(userId: string, updateUserDto: IUpdateUserUseCaseDto): Promise<User>;
}
