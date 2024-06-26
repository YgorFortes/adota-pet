import { Inject, Injectable } from '@nestjs/common';
import { IUpdateShelterUseCaseDto } from './dtos/IUpdateShelter.useCase.dto';
import { UpdateUserUseCase } from 'src/useCases/user/updateUser/UpdateUser.useCase';
import { UpdateAddressUseCase } from 'src/useCases/address/updateAddress/UpdateAddress.useCase';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IShelterRepository } from 'src/repositories/interfaces/IShelterRepository.interface';
import { userAssociation } from 'src/enum/userAssociation.enum';
import { Shelter } from 'src/entities/Shelter.entity';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';

@Injectable()
export class UpdateShelterUseCase {
  constructor(
    @Inject(RepositoryType.IShelterRepository) private shelterRepository: IShelterRepository,
    private updateUserUseCase: UpdateUserUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private updateAddressUseCase: UpdateAddressUseCase,
  ) {}
  async execute(userId: string, updateShelterDto: IUpdateShelterUseCaseDto): Promise<Shelter> {
    const { about, webSite, workingHours, user, address } = updateShelterDto;

    const userAssociationShelter = await this.findUserByIdUseCase.execute(
      userId,
      userAssociation.SHELTER,
    );

    const shelterUpdated = await this.shelterRepository.updateShelter(
      userAssociationShelter.shelter.id,
      {
        about,
        webSite,
        workingHours,
      },
    );

    const userUpdated = user ? await this.updateUserUseCase.execute(userId, user) : null;

    const addressId = userAssociationShelter.shelter.address.id;

    const addressUpdated = address
      ? await this.updateAddressUseCase.execute(addressId, address)
      : null;

    const shelter = {
      ...shelterUpdated,
      user: userUpdated ? { ...userUpdated } : null,
      address: addressUpdated ? { ...addressUpdated } : null,
    };

    return shelter;
  }
}
