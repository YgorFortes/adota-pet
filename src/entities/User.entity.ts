import { UserRole } from 'src/enum/roleUser.enum';

type propsUser = {
  id?: string;

  name: string;

  email: string;

  password: string;

  role: UserRole;

  photo: string;

  telephone: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class User {
  public readonly id: string;

  public name: string;

  public email: string;

  public readonly password: string;

  public role: UserRole;

  public photo: string;

  public telephone: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(props: propsUser) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
    this.photo = props.photo;
    this.telephone = props.telephone;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
