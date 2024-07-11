import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserWithAssociation } from 'src/common/interfaces/IUserWithAssociation';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';
import { UserRole } from 'src/common/enum/roleUser.enum';

@Injectable()
export class VerifyUserAssociationUseCase {
  constructor(@Inject(RepositoryType.IUserRepository) private userRepository: IUserRepository) {}

  async validateUserAssociation(
    userId: string,
    associantion: UserRole,
    user?: IUserWithAssociation,
  ): Promise<void> {
    const userAssociation: IUserWithAssociation =
      user ?? (await this.userRepository.findById(userId, associantion));

    if (userAssociation.guardian) {
      throw new BadRequestException('Este usuário já está associado a um tutor. ');
    }

    if (userAssociation.shelter) {
      throw new BadRequestException('Este usuário já está associado a um abrigo. ');
    }
  }
}
