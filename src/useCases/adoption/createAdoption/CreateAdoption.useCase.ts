import { ConflictException, Inject } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import {
  IAdoptionRepository,
  AdoptionWithoutGuardianAndPet,
} from 'src/repositories/interfaces/IAdoptionRepository.interface';
import { ICreateAdoptionUseCaseDto } from './dtos/ICreateAdoption.useCase.dto';
import { Adoption } from 'src/entities/Adoption.entity';
import { FindPetByIdUseCase } from 'src/useCases/pet/findPetById/FindPetById.useCase';
import { FindGuardianByIdUseCase } from 'src/useCases/guardian/findGuardianById/FindGuardianById.useCase';
import { AdoptionStatus } from 'src/common/enum/adoptionStatus.enum';
import { UpdatePetUseCase } from 'src/useCases/pet/updatePet/UpdatePet.useCase';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { userAssociation } from 'src/common/enum/userAssociation.enum';
import { PetStatus } from 'src/common/enum/petStatus.enum';
import { Pet } from 'src/entities/Pet.entity';

export class CreateAdoptionUseCase {
  constructor(
    @Inject(RepositoryType.IAdoptionRepository) private adoptionRepository: IAdoptionRepository,
    private findPetByIdUseCase: FindPetByIdUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findGuardianByIdUseCase: FindGuardianByIdUseCase,
    private updatePetUseCase: UpdatePetUseCase,
  ) {}

  async execute(
    adoptionDto: ICreateAdoptionUseCaseDto,
    userId: string,
  ): Promise<AdoptionWithoutGuardianAndPet> {
    const user = await this.findUserByIdUseCase.execute(userId, userAssociation.SHELTER);

    const pet = await this.findPetByIdUseCase.execute(adoptionDto.petId, user.shelter.id);
    const guardian = await this.findGuardianByIdUseCase.execute(adoptionDto.guardianId);

    this.checkPetAvailabilityForAdoption(pet);

    const adoption = new Adoption({
      ...adoptionDto,
      guardian,
      pet,
      status: AdoptionStatus.CONCLUIDO,
    });

    const adoptionCreated = await this.adoptionRepository.saveAdoption(adoption);

    await this.updatePetUseCase.execute(pet.id, user.id, { status: PetStatus.ADOTADO }, user, pet);

    return { ...adoptionCreated };
  }

  private checkPetAvailabilityForAdoption(pet: Pet): void {
    if (pet.status === PetStatus.ADOTADO) {
      throw new ConflictException('Pet já foi adotado');
    }
  }
}
