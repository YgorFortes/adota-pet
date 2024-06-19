import { Address } from 'src/entities/Address.entity';

export interface ICreateShelterUseCaseDto {
  abbout: string;

  webSite: string;

  workingHours: string;

  address: Address;

  idUser: string;
}
