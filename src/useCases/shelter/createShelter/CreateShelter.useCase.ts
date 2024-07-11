import { Inject, Injectable } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IShelterRepository } from 'src/repositories/interfaces/IShelterRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { ICreateShelterUseCaseDto } from './dtos/ICreateShelter.UseCase.dto';
import { VerifyUserAssociationUseCase } from 'src/useCases/user/VerifyUserGuardian/VerifyUserAssociation.useCase';
import { CreateAddressUseCase } from 'src/useCases/address/createAddress/CreateAddress.useCase';
import { Shelter } from 'src/entities/Shelter.entity';
import { UserRole } from 'src/common/enum/roleUser.enum';

@Injectable()
export class CreateShelterUseCase {
  constructor(
    @Inject(RepositoryType.IShelterRepository) private shelterReposiotory: IShelterRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private verifyUserAssociationUseCase: VerifyUserAssociationUseCase,
    private createAddressUseCase: CreateAddressUseCase,
  ) {}

  async execute(shelterDto: ICreateShelterUseCaseDto): Promise<Shelter> {
    const { about, webSite, workingHours, address } = shelterDto;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.findUserByIdUseCase.execute(shelterDto.idUser, UserRole.SHELTER);

    await this.verifyUserAssociationUseCase.validateUserAssociation(
      shelterDto.idUser,
      UserRole.SHELTER,
      user,
    );

    const addresCreated = await this.createAddressUseCase.execute(address);

    const shelter = new Shelter({
      about,
      webSite,
      workingHours,
      address: addresCreated,
      user,
    });

    const shelterCreated = await this.shelterReposiotory.save(shelter);

    return shelterCreated;
  }
}
