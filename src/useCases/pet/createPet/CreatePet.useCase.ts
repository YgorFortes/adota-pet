import { Pet } from 'src/entities/Pet.entity';
import { ICreatePetUseCaseDTO } from './dtos/ICreatePet.useCase.dto';
import { Inject } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { Provide } from 'src/common/enum/provider.enum';
import { ISavePhotoInCloudInterface } from 'src/useCases/common/savePhotoInCloud/interface/ISavePhotoInCloud.interface';
import { userAssociation } from 'src/common/enum/userAssociation.enum';

export class CreatePetUseCase {
  constructor(
    @Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    @Inject(Provide.ISavePhotoInCloudInterface)
    private savePhotoInCloud: ISavePhotoInCloudInterface,
  ) {}
  async execute(userId: string, createPetDto: ICreatePetUseCaseDTO): Promise<Pet> {
    const user = await this.findUserByIdUseCase.execute(userId, userAssociation.SHELTER);

    const imageUrl = await this.savePhotoInCloud.execute(createPetDto.image);

    const pet = new Pet({ ...createPetDto, shelter: user.shelter, image: imageUrl });

    const petCreated = await this.petRepository.savePet(pet);

    return petCreated;
  }
}
