import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IShelterRepository } from 'src/repositories/interfaces/IShelterRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { LogoutUserUseCase } from 'src/useCases/user/logoutUser/LogoutUser.useCase';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { DeleteUserUseCase } from 'src/useCases/user/deleteUser/DeleteUser.useCase';
import { Provide } from 'src/common/enum/provider.enum';
import { IManagePhotoInCloudInterface } from 'src/useCases/common/ManagePhotoInCloud/interface/ISavePhotoInCloud.interface';

@Injectable()
export class DeleteShelterUseCase {
  constructor(
    @Inject(RepositoryType.IShelterRepository) private shelterRepository: IShelterRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private logoutUserUseCase: LogoutUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    @Inject(Provide.IManagePhotoInCloudInterface)
    private managePhotoInCloud: IManagePhotoInCloudInterface,
  ) {}

  async execute(userId: string, token: string): Promise<boolean> {
    const user = await this.findUserByIdUseCase.execute(userId, UserRole.SHELTER);

    const shelterId = user.shelter.id;

    await this.deleteUserUseCase.execute(user);

    const result = await this.shelterRepository.deleteShelter(shelterId);

    if (!result) {
      throw new InternalServerErrorException(`Não foi possivel deletar abrigo. id: ${shelterId}`);
    }

    await this.managePhotoInCloud.deletePhoto(user.photo);

    await this.logoutUserUseCase.execute(token);
    return true;
  }
}
