import { Guardian } from 'src/entities/Guardian.entity';
import { User } from 'src/entities/User.entity';

export interface IUserWithGuardian extends User {
  guardian?: Guardian;
}
