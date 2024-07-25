import { Inject } from '@nestjs/common';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';

export class FindAllPetsByShelterUseCase {
  constructor(@Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository) {}

  async execute(
    shelterId: string,
    pagination: IFindAllPaginationUseCaseDto,
  ): Promise<IPagination<Pet>> {
    const pets = await this.petRepository.findAllPets(pagination, shelterId);

    return pets;
  }
}
