import { Address } from './Address.entity';
import { User } from './User.entity';

type propsShelter = {
  id?: string;

  about?: string;

  webSite?: string;

  workingHours?: string;

  address: Address;

  user: Omit<User, 'password'>;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
};

export class Shelter {
  public readonly id?: string;

  public about: string;

  public webSite?: string;

  public workingHours?: string;

  public readonly address: Address;

  public readonly user: Omit<User, 'password'>;

  public createdAt?: Date;

  public updatedAt?: Date;

  public deletedAt?: Date;

  constructor(props: propsShelter) {
    this.id = props.id;
    this.about = props.about;
    this.webSite = props.webSite;
    this.workingHours = props.workingHours;
    this.address = props.address;
    this.user = props.user;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
