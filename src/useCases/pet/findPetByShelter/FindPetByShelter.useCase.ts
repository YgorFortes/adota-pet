import { Inject, NotFoundException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';

export class FindPetByShelterUseCase {
  constructor(
    @Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute(petId: string, userId: string): Promise<Omit<Pet, 'shelter'>> {
    const user = await this.findUserByIdUseCase.execute(userId, UserRole.SHELTER);

    const shelterId = user.shelter.id;

    const pet = await this.petRepository.findPetById(petId, shelterId);

    if (!pet) {
      throw new NotFoundException('Pet não encontrado.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { shelter, ...petWithoutShelter } = pet;

    return petWithoutShelter;
  }
}
