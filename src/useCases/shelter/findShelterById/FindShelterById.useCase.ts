import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Shelter } from 'src/entities/Shelter.entity';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IShelterRepository } from 'src/repositories/interfaces/IShelterRepository.interface';

@Injectable()
export class FindShelterByIdUseCase {
  constructor(
    @Inject(RepositoryType.IShelterRepository) private shelterRepository: IShelterRepository,
  ) {}

  async execute(shelterId: string): Promise<Shelter> {
    const shelter = await this.shelterRepository.findShelterById(shelterId);

    if (!shelter) {
      throw new NotFoundException('Abrigo não encontrado.');
    }

    return shelter;
  }
}
