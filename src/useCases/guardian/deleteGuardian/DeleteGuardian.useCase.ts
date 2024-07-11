import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { LogoutUserUseCase } from 'src/useCases/user/logoutUser/LogoutUser.useCase';
import { IManagePhotoInCloudInterface } from 'src/useCases/common/ManagePhotoInCloud/interface/ISavePhotoInCloud.interface';
import { Provide } from 'src/common/enum/provider.enum';
import { UserRole } from 'src/common/enum/roleUser.enum';

@Injectable()
export class DeleteGuardianUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private logoutUserUseCase: LogoutUserUseCase,
    @Inject(Provide.IManagePhotoInCloudInterface)
    private managePhotoInCloud: IManagePhotoInCloudInterface,
  ) {}

  async execute(userId: string, request: IRequestWithUser): Promise<boolean> {
    const userWithGuardian = await this.findUserByIdUseCase.execute(userId, UserRole.GUARDIAN);

    const result = await this.guardianRepository.deleteGuardian(userWithGuardian.guardian.id);

    const guardianId = userWithGuardian.guardian.id;
    if (!result) {
      throw new InternalServerErrorException(`Não foi possivel deletar tutor. id: ${guardianId}`);
    }

    await this.managePhotoInCloud.deletePhoto(userWithGuardian.photo);

    await this.logoutUserUseCase.execute(request);
    return true;
  }
}
