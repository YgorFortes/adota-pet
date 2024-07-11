import { Inject, NotFoundException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';
import { IUpdatePetUseCaseDto } from './dtos/IUpdatePet.useCase.dto';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { IImageFile } from 'src/useCases/user/createUser/dtos/IImageFile';
import { Provide } from 'src/common/enum/provider.enum';
import { IManagePhotoInCloudInterface } from 'src/useCases/common/ManagePhotoInCloud/interface/ISavePhotoInCloud.interface';
import { IUserWithAssociation } from 'src/common/interfaces/IUserWithAssociation';
import { UserRole } from 'src/common/enum/roleUser.enum';

export class UpdatePetUseCase {
  constructor(
    @Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    @Inject(Provide.IManagePhotoInCloudInterface)
    private managePhotoInCloud: IManagePhotoInCloudInterface,
  ) {}

  async execute(
    petId: string,
    userId: string,
    updatePetUseCaseDto: IUpdatePetUseCaseDto,
    userEntity?: IUserWithAssociation,
    petEntity?: Pet,
  ): Promise<Pet> {
    const { photo } = updatePetUseCaseDto;

    const user = userEntity ?? (await this.findUserByIdUseCase.execute(userId, UserRole.SHELTER));

    const shelterId = user.shelter.id;

    const pet = petEntity ?? (await this.petRepository.findPetById(petId, shelterId));

    if (!pet) {
      throw new NotFoundException('O pet não existe ou não está associado ao abrigo.');
    }

    const petUpdated = await this.petRepository.updatePet(petId, {
      ...updatePetUseCaseDto,
      photo: (await this.updatePhoto(photo)) || undefined,
    });

    if (photo) {
      await this.managePhotoInCloud.deletePhoto(pet.photo);
    }

    return petUpdated;
  }

  private async updatePhoto(image: IImageFile): Promise<string | null> {
    const urlPhoto = image ? await this.managePhotoInCloud.uploadPhoto(image) : null;

    return urlPhoto;
  }
}
