import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';

@Injectable()
export class FindUserByIdUseCase {
  constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const userExist = await this.userRepository.findById(id);

    if (!userExist) {
      throw new BadRequestException('Usuário não existe');
    }

    return userExist;
  }
}
