import { Pet } from 'src/entities/Pet.entity';
import { ICreatePetUseCaseDTO } from './dtos/ICreatePet.useCase.dto';
import { Inject } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { Provide } from 'src/common/enum/provider.enum';
import { IManagePhotoInCloudInterface } from 'src/useCases/common/ManagePhotoInCloud/interface/ISavePhotoInCloud.interface';
import { UserRole } from 'src/common/enum/roleUser.enum';

export class CreatePetUseCase {
  constructor(
    @Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    @Inject(Provide.IManagePhotoInCloudInterface)
    private managePhotoInCloud: IManagePhotoInCloudInterface,
  ) {}
  async execute(userId: string, createPetDto: ICreatePetUseCaseDTO): Promise<Pet> {
    const user = await this.findUserByIdUseCase.execute(userId, UserRole.SHELTER);

    const photoUrl = await this.managePhotoInCloud.uploadPhoto(createPetDto.photo);

    const pet = new Pet({ ...createPetDto, shelter: user.shelter, photo: photoUrl });

    const petCreated = await this.petRepository.savePet(pet);

    return petCreated;
  }
}
