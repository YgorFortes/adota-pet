import { AdoptionStatus } from 'src/common/enum/adoptionStatus.enum';
import { Guardian } from './Guardian.entity';
import { Pet } from './Pet.entity';

type propsAdoption = {
  id?: string;

  adoptionDate: Date;

  notes?: string;

  status: AdoptionStatus;

  guardian: Guardian;

  pet: Pet;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
};

export class Adoption {
  public readonly id?: string;

  public readonly adoptionDate: Date;

  public status: AdoptionStatus;

  public notes?: string;

  public readonly guardian: Guardian;

  public readonly pet: Pet;

  public createdAt?: Date;

  public updatedAt?: Date;

  public deletedAt?: Date;

  constructor(propsAdoption: propsAdoption) {
    this.id = propsAdoption.id;
    this.adoptionDate = propsAdoption.adoptionDate;
    this.notes = propsAdoption.notes;
    this.status = propsAdoption.status;
    this.guardian = propsAdoption.guardian;
    this.pet = propsAdoption.pet;
    this.createdAt = propsAdoption.createdAt;
    this.updatedAt = propsAdoption.updatedAt;
    this.deletedAt = propsAdoption.deletedAt;
  }
}
