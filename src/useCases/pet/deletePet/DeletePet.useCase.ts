import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Provide } from 'src/common/enum/provider.enum';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';
import { IManagePhotoInCloudInterface } from 'src/useCases/common/ManagePhotoInCloud/interface/ISavePhotoInCloud.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';

export class DeletePetUseCase {
  constructor(
    @Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    @Inject(Provide.IManagePhotoInCloudInterface)
    private managePhotoInCloud: IManagePhotoInCloudInterface,
  ) {}

  async execute(petId: string, userId: string): Promise<boolean> {
    const user = await this.findUserByIdUseCase.execute(userId, UserRole.SHELTER);

    const shelterId = user.shelter.id;

    const pet = await this.petRepository.findPetById(petId, shelterId);

    if (!pet) {
      throw new NotFoundException('O pet não existe ou não está associado ao abrigo.');
    }

    await this.managePhotoInCloud.deletePhoto(pet.photo);

    const result = await this.petRepository.deletePet(petId);

    if (!result) {
      throw new InternalServerErrorException(`Não foi possível deletar o pet. id: ${petId}`);
    }

    return true;
  }
}
