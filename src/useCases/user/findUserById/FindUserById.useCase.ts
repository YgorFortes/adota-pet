import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserWithAssociation } from 'src/common/interfaces/IUserWithAssociation';
import { UserRole } from 'src/common/enum/roleUser.enum';

@Injectable()
export class FindUserByIdUseCase {
  constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {}

  async execute(userId: string, associantion?: UserRole): Promise<IUserWithAssociation> {
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
