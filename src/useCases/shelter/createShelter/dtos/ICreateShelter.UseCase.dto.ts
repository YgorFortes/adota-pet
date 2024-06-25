import { Address } from 'src/entities/Address.entity';

export interface ICreateShelterUseCaseDto {
  about: string;

  webSite: string;

  workingHours: string;

  address: Address;

  idUser: string;
}
