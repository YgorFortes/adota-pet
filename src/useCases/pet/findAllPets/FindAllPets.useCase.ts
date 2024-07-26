import { Inject } from '@nestjs/common';

import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';
import { IFilterPetsUseCaseDto } from './dto/IFilterPets.useCase.dto';

export class FindAllPetsUseCase {
  constructor(@Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository) {}
  async execute(filters: IFilterPetsUseCaseDto): Promise<IPagination<Pet>> {
    const pets = await this.petRepository.findAllPets(filters);

    return pets;
  }
}
