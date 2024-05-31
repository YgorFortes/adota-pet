import { Address } from './Address.entity';
import { User } from './User.entity';

export class Guardian {
  public readonly id: string;

  public about: string;

  public birthDate: Date;

  public user: User;

  public address: Address;

  constructor(props: Omit<Guardian, 'id'>) {
    Object.assign(this, props);
  }
}
