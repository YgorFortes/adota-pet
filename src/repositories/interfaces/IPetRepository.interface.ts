import { Pet } from 'src/entities/Pet.entity';

export interface IPetRepository {
  savePet(petDto: Pet): Promise<Pet>;
}
