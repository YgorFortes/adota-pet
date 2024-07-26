import { Inject, NotFoundException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Shelter } from 'src/entities/Shelter.entity';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IShelterRepository } from 'src/repositories/interfaces/IShelterRepository.interface';
import { FiltersFindAllSheltersDto } from './dto/FiltersFindAllShelters.controller.dto';

export class FindAllSheltersUseCase {
  constructor(
    @Inject(RepositoryType.IShelterRepository) private shelterRepository: IShelterRepository,
  ) {}

  async execute(filters: FiltersFindAllSheltersDto): Promise<IPagination<Shelter>> {
    const shelters = await this.shelterRepository.findAllShelters(filters);

    if (shelters.items.length < 1) {
      throw new NotFoundException('Abrigo não encontrado.');
    }

    return shelters;
  }
}
