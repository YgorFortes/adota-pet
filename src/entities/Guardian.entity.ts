import { Address } from './Address.entity';
import { User } from './User.entity';

type propsGuardian = {
  id?: string;

  about?: string;

  birthDate: Date;

  address: Address;

  user: Omit<User, 'password'>;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
};

export class Guardian {
  public readonly id: string;

  public about: string;

  public birthDate: Date;

  public readonly address: Address;

  public readonly user: Omit<User, 'password'>;

  public createdAt?: Date;

  public updatedAt?: Date;

  public deletedAt?: Date;

  constructor(props: propsGuardian) {
    this.id = props.id;
    this.about = props.about;
    this.birthDate = props.birthDate;
    this.user = props.user;
    this.address = props.address;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
