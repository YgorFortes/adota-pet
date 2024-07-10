import { Guardian } from 'src/entities/Guardian.entity';
import { Shelter } from 'src/entities/Shelter.entity';
import { User } from 'src/entities/User.entity';

export interface IUserWithAssociation extends Omit<User, 'password'> {
  guardian?: Guardian;
  shelter?: Shelter;
}
