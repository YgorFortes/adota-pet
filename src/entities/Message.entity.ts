import { Guardian } from './Guardian.entity';
import { Pet } from './Pet.entity';
import { Shelter } from './Shelter.entity';

type propsMessage = {
  id?: string;

  content: string;

  guardian: Guardian;

  shelter: Shelter;

  pet: Pet;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
};

export class Message {
  public readonly id?: string;
  public content: string;
  public readonly guardian: Guardian;
  public readonly shelter: Shelter;
  public readonly pet: Pet;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(propsMessage: propsMessage) {
    this.id = propsMessage.id;
    this.content = propsMessage.content;
    this.guardian = propsMessage.guardian;
    this.shelter = propsMessage.shelter;
    this.pet = propsMessage.pet;
    this.createdAt = propsMessage.createdAt;
    this.updatedAt = propsMessage.updatedAt;
    this.deletedAt = propsMessage.deletedAt;
  }
}
