import { Guardian } from 'src/entities/Guardian.entity';
import { Shelter } from 'src/entities/Shelter.entity';
import { User } from 'src/entities/User.entity';

export interface IUserWithAssociation extends User {
  guardian?: Guardian;
  shelter?: Shelter;
}
