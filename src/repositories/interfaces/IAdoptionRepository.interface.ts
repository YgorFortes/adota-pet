import { Adoption } from 'src/entities/Adoption.entity';

export type AdoptionWithoutGuardianAndPet = Omit<Adoption, 'guardian' | 'pet'>;

export interface IAdoptionRepository {
  saveAdoption(adoptionDto: Adoption): Promise<AdoptionWithoutGuardianAndPet>;
  findAdoptionById(adoptionId: string, userId?: string): Promise<Adoption>;
  deleteAdoption(adoptionId: string): Promise<boolean>;
}
