import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';
import { ICreateUserUseCaseDTO } from './dtos/ICreateUser.useCase.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { RepositoryType } from 'src/enum/repositoryType.enum';

@Injectable()
export class CreateUserUseCase {
  constructor(@Inject(RepositoryType.IUserRepository) private userRepository: IUserRepository) {}

  async execute(dataUser: ICreateUserUseCaseDTO): Promise<User> {
    const userExist = await this.userRepository.findByEmail(dataUser.email);

    if (userExist) {
      throw new BadRequestException('Usuário já existe');
    }

    const user = new User({ ...dataUser });

    const userSaved = await this.userRepository.save(user);
    return userSaved;
  }
}
