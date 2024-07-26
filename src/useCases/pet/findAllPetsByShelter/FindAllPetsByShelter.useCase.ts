import { Inject } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';
import { IFilterPetsUseCaseDto } from '../findAllPets/dto/IFilterPets.useCase.dto';

export class FindAllPetsByShelterUseCase {
  constructor(@Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository) {}

  async execute(shelterId: string, filters: IFilterPetsUseCaseDto): Promise<IPagination<Pet>> {
    const pets = await this.petRepository.findAllPets(filters, shelterId);

    return pets;
  }
}
