import { Inject, NotFoundException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';

export class FindPetByIdUseCase {
  constructor(@Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository) {}

  async execute(petId: string, shelterId?: string): Promise<Pet> {
    const pet = await this.petRepository.findPetById(petId, shelterId);

    if (!pet) {
      throw new NotFoundException('Pet não encontrado.');
    }
    return pet;
  }
}
