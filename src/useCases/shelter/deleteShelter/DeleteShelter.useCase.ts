import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IShelterRepository } from 'src/repositories/interfaces/IShelterRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { LogoutUserUseCase } from 'src/useCases/user/logoutUser/LogoutUser.useCase';
import { IManagePhotoInCloudInterface } from 'src/useCases/common/ManagePhotoInCloud/interface/ISavePhotoInCloud.interface';
import { Provide } from 'src/common/enum/provider.enum';
import { UserRole } from 'src/common/enum/roleUser.enum';

@Injectable()
export class DeleteShelterUseCase {
  constructor(
    @Inject(RepositoryType.IShelterRepository) private shelterRepository: IShelterRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private logoutUserUseCase: LogoutUserUseCase,
    @Inject(Provide.IManagePhotoInCloudInterface)
    private managePhotoInCloud: IManagePhotoInCloudInterface,
  ) {}

  async execute(userId: string, request: IRequestWithUser): Promise<boolean> {
    const user = await this.findUserByIdUseCase.execute(userId, UserRole.SHELTER);

    const shelterId = user.shelter.id;

    const result = await this.shelterRepository.deleteShelter(shelterId);

    if (!result) {
      throw new InternalServerErrorException(`Não foi possivel deletar abrigo. id: ${shelterId}`);
    }

    await this.managePhotoInCloud.deletePhoto(user.photo);

    await this.logoutUserUseCase.execute(request);
    return true;
  }
}
