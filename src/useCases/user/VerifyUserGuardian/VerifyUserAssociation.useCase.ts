import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserWithGuardian } from 'src/common/interfaces/IUserWithGuardian';
import { User } from 'src/entities/User.entity';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';

@Injectable()
export class VerifyUserAssociationUseCase {
  constructor(@Inject(RepositoryType.IUserRepository) private userRepository: IUserRepository) {}

  async verifyUserAssociationWithGuardian(id: string): Promise<void> {
    const userGuadianAssociationExist: IUserWithGuardian =
      await this.userRepository.findUserGuardianAndAddressAssociation(id);

    if (userGuadianAssociationExist.guardian) {
      throw new BadRequestException('Este usuário já está associado a um tutor. ');
    }
  }

  async findAssociantionWithUser(id: string): Promise<User> {
    const addressAndGuardianForUser: IUserWithGuardian =
      await this.userRepository.findUserGuardianAndAddressAssociation(id);

    return addressAndGuardianForUser;
  }
}
