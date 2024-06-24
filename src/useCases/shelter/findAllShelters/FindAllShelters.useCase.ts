import { Inject, NotFoundException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Shelter } from 'src/entities/Shelter.entity';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IShelterRepository } from 'src/repositories/interfaces/IShelterRepository.interface';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';

export class FindAllSheltersUseCase {
  constructor(
    @Inject(RepositoryType.IShelterRepository) private shelterRepository: IShelterRepository,
  ) {}

  async execute(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Shelter>> {
    const shelters = await this.shelterRepository.findAllShelters(pagination);

    if (shelters.items.length < 1) {
      throw new NotFoundException('Abrigo não encontrado.');
    }

    return shelters;
  }
}
