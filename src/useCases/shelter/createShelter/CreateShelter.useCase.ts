import { Inject, Injectable } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IShelterRepository } from 'src/repositories/interfaces/IShelterRepository.interface';
import { ICreateShelterUseCaseDto } from './dtos/ICreateShelter.UseCase.dto';
import { Shelter } from 'src/entities/Shelter.entity';
import { User } from 'src/entities/User.entity';
import { Address } from 'src/entities/Address.entity';

@Injectable()
export class CreateShelterUseCase {
  constructor(
    @Inject(RepositoryType.IShelterRepository) private shelterReposiotory: IShelterRepository,
  ) {}

  async execute(
    shelterDto: ICreateShelterUseCaseDto,
    user: User,
    address: Address,
  ): Promise<Shelter> {
    const { about, webSite, workingHours } = shelterDto;

    const shelter = new Shelter({
      about,
      webSite,
      workingHours,
      address: address,
      user,
    });

    const shelterCreated = await this.shelterReposiotory.save(shelter);

    return shelterCreated;
  }
}
