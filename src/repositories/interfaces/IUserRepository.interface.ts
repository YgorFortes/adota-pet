import { User } from 'src/entities/User.entity';
import { ICreateUserDTO } from 'src/useCases/user/createUser/dtos/ICreateUser.useCase.dto';

export interface IUserRepository {
  save(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
