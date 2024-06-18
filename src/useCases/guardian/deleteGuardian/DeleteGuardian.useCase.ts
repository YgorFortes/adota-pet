import { Inject, Injectable } from '@nestjs/common';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { IUserWithGuardian } from 'src/common/interfaces/IUserWithGuardian';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';
import { VerifyUserAssociationUseCase } from 'src/useCases/user/VerifyUserGuardian/VerifyUserAssociation.useCase';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { LogoutUserUseCase } from 'src/useCases/user/logoutUser/LogoutUser.useCase';

@Injectable()
export class DeleteGuardianUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private verifyUserAssociationUseCase: VerifyUserAssociationUseCase,
    private logoutUserUseCase: LogoutUserUseCase,
  ) {}

  async execute(idUser: string, request: IRequestWithUser): Promise<boolean> {
    await this.findUserByIdUseCase.execute(idUser);

    const userWithGuardian: IUserWithGuardian =
      await this.verifyUserAssociationUseCase.findAssociantionWithUser(idUser);

    const result = await this.guardianRepository.deleteGuardian(userWithGuardian.guardian.id);

    if (result) {
      this.logoutUserUseCase.execute(request);
      return true;
    }
  }
}
