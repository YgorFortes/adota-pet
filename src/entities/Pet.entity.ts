import { PetSize } from 'src/common/enum/petSize.enum';
import { PetStatus } from 'src/common/enum/petStatus.enum';
import { Shelter } from './Shelter.entity';
import { Guardian } from './Guardian.entity';
import { PetSpecie } from 'src/common/enum/petSpecie.enum';

type propsPet = {
  id?: string;

  name: string;

  birthDate?: Date;

  photo: string;

  size: PetSize;

  behavior: string;

  status?: PetStatus;

  specie: PetSpecie;

  shelter: Shelter;

  guardian?: Guardian;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
};

export class Pet {
  public readonly id?: string;
  public name: string;
  public birthDate?: Date;
  public photo: string;
  public size: PetSize;
  public behavior: string;
  public status?: PetStatus;
  public specie: PetSpecie;
  public readonly shelter: Shelter;
  public readonly guardian?: Guardian;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(props: propsPet) {
    this.id = props.id;
    this.name = props.name;
    this.birthDate = props.birthDate;
    this.photo = props.photo;
    this.size = props.size;
    this.behavior = props.behavior;
    this.status = props.status;
    this.specie = props.specie;
    this.shelter = props.shelter;
    this.guardian = props.guardian;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
