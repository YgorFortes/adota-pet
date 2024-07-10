import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PetStatus } from 'src/common/enum/petStatus.enum';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IUserWithAssociation } from 'src/common/interfaces/IUserWithAssociation';
import { Adoption } from 'src/entities/Adoption.entity';
import { IAdoptionRepository } from 'src/repositories/interfaces/IAdoptionRepository.interface';
import { UpdatePetUseCase } from 'src/useCases/pet/updatePet/UpdatePet.useCase';

export class DeleteAdoptionUseCase {
  constructor(
    @Inject(RepositoryType.IAdoptionRepository) private adoptionRepository: IAdoptionRepository,
    private updatePetUseCase: UpdatePetUseCase,
  ) {}

  async execute(userId: string, adoptionId: string): Promise<boolean> {
    const adoption = await this.adoptionRepository.findAdoptionById(adoptionId, userId);

    this.ensureAdoptionBelongsToUser(adoption);

    const user: IUserWithAssociation = {
      ...adoption.pet.shelter.user,
      shelter: adoption.pet.shelter,
    };

    const pet = adoption.pet;

    const result = await this.adoptionRepository.deleteAdoption(adoption.id);

    if (!result) {
      throw new InternalServerErrorException(`Não foi possivel deletar adoção. id: ${adoptionId}`);
    }

    await this.updatePetUseCase.execute(
      pet.id,
      user.id,
      { status: PetStatus.NÃO_ADOTADO },
      user,
      pet,
    );

    return true;
  }

  private ensureAdoptionBelongsToUser(adoption: Adoption): void {
    if (!adoption) {
      throw new NotFoundException('Adoção não existe, ou não estar associada a abrigo.');
    }
  }
}
