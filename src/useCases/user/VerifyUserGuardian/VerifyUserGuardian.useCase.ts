import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Guardian } from 'src/entities/Guardian.entity';
import { User } from 'src/entities/User.entity';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';

interface IUserWithGuardian extends User {
  guardian?: Guardian;
}

@Injectable()
export class VerifyUserGuardianUseCase {
  constructor(@Inject(RepositoryType.IUserRepository) private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const userGuadianAssociationExist: IUserWithGuardian =
      await this.userRepository.findUserGuardianAssociation(id);

    if (userGuadianAssociationExist.guardian) {
      throw new BadRequestException('Este usuário já está associado a um tutor. ');
    }
  }
}
