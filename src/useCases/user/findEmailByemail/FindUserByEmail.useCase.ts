import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {}

  async execute(email: string): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new BadRequestException('Usuário não existe');
    }

    return userExist;
  }
}
