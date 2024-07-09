import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { userAssociation } from 'src/common/enum/userAssociation.enum';
import { IPetRepository } from 'src/repositories/interfaces/IPetRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';

export class DeletePetUseCase {
  constructor(
    @Inject(RepositoryType.IPetRepository) private petRepository: IPetRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute(petId: string, userId: string): Promise<boolean> {
    const user = await this.findUserByIdUseCase.execute(userId, userAssociation.SHELTER);

    const shelterId = user.shelter.id;

    const pet = await this.petRepository.findPetById(petId, shelterId);

    if (!pet) {
      throw new NotFoundException('O pet não existe ou não está associado ao abrigo.');
    }

    const result = await this.petRepository.deletePet(petId);

    if (!result) {
      throw new InternalServerErrorException(`Não foi possível deletar o pet. id: ${petId}`);
    }

    return true;
  }
}
