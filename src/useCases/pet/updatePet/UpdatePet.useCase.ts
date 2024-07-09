import { Inject, NotFoundException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';
import { IUpdatePetUseCaseDto } from './dtos/IUpdatePet.useCase.dto';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { userAssociation } from 'src/common/enum/userAssociation.enum';
import { IImageFile } from 'src/useCases/user/createUser/dtos/IImageFile';
import { Provide } from 'src/common/enum/provider.enum';
import { ISavePhotoInCloudInterface } from 'src/useCases/common/savePhotoInCloud/interface/ISavePhotoInCloud.interface';

export class UpdatePetUseCase {
  constructor(
    @Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    @Inject(Provide.ISavePhotoInCloudInterface)
    private savePhotoInCloud: ISavePhotoInCloudInterface,
  ) {}

  async execute(
    petId: string,
    userId: string,
    updatePetUseCaseDto: IUpdatePetUseCaseDto,
  ): Promise<Pet> {
    const { image } = updatePetUseCaseDto;

    const user = await this.findUserByIdUseCase.execute(userId, userAssociation.SHELTER);

    const shelterId = user.shelter.id;

    const pet = await this.petRepository.findPetByShelter(petId, shelterId);

    if (!pet) {
      throw new NotFoundException('O pet não existe ou não está associado ao abrigo.');
    }

    //verificar se o status do animal foi mudado para adotado, se sim, a tabela(ainda não criada deve ser preenchida)

    const petUpdated = await this.petRepository.updatePet(petId, {
      ...updatePetUseCaseDto,
      image: (await this.updatePhoto(image)) || undefined,
    });

    return petUpdated;
  }

  private async updatePhoto(image: IImageFile): Promise<string | null> {
    const urlPhoto = image ? await this.savePhotoInCloud.execute(image) : null;

    return urlPhoto;
  }
}