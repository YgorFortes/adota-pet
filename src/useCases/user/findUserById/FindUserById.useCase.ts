import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { userAssociation } from 'src/common/enum/userAssociation.enum';
import { IUserWithAssociation } from 'src/common/interfaces/IUserWithAssociation';

@Injectable()
export class FindUserByIdUseCase {
  constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {}

  async execute(userId: string, associantion?: userAssociation): Promise<IUserWithAssociation> {
    const userExist: IUserWithAssociation = await this.userRepository.findById(
      userId,
      associantion,
    );

    if (!userExist) {
      throw new BadRequestException('Usuário não existe');
    }

    return userExist;
  }
}
