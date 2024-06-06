import { Guardian } from 'src/entities/Guardian.entity';

export interface IGuardianRepository {
  save(data: Guardian): Promise<Guardian>;
}
