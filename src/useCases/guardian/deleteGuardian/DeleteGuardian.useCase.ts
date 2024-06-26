import { Inject, Injectable } from '@nestjs/common';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { userAssociation } from 'src/enum/userAssociation.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { LogoutUserUseCase } from 'src/useCases/user/logoutUser/LogoutUser.useCase';

@Injectable()
export class DeleteGuardianUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private logoutUserUseCase: LogoutUserUseCase,
  ) {}

  async execute(userId: string, request: IRequestWithUser): Promise<boolean> {
    await this.findUserByIdUseCase.execute(userId);

    const userWithGuardian = await this.findUserByIdUseCase.execute(
      userId,
      userAssociation.GUARDIAN,
    );

    const result = await this.guardianRepository.deleteGuardian(userWithGuardian.guardian.id);

    if (result) {
      await this.logoutUserUseCase.execute(request);
      return true;
    }
  }
}
