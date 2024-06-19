import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserWithAssociation } from 'src/common/interfaces/IUserWithAssociation';
import { User } from 'src/entities/User.entity';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { userAssociation } from 'src/enum/userAssociation.enum';
import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';

@Injectable()
export class VerifyUserAssociationUseCase {
  constructor(@Inject(RepositoryType.IUserRepository) private userRepository: IUserRepository) {}

  async verifyUserAssociationWithGuardianOrShelter(
    id: string,
    associantion: userAssociation,
  ): Promise<void> {
    const userAssociation: IUserWithAssociation = await this.userRepository.findUserWithAssociation(
      id,
      associantion,
    );

    if (userAssociation.guardian) {
      throw new BadRequestException('Este usuário já está associado a um tutor. ');
    }

    if (userAssociation.shelter) {
      throw new BadRequestException('Este usuário já está associado a um abrigo. ');
    }
  }

  async findAssociantionWithUser(id: string, associantion: userAssociation): Promise<User> {
    const addressAndGuardianForUser: IUserWithAssociation =
      await this.userRepository.findUserWithAssociation(id, associantion);

    return addressAndGuardianForUser;
  }
}
