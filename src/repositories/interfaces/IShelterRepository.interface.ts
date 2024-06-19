import { Shelter } from 'src/entities/Shelter.entity';
import { EntityManager } from 'typeorm';

export interface IShelterRepository {
  save(shelterdto: Shelter, transaction?: EntityManager): Promise<Shelter>;
}
