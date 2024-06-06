import { Address } from 'src/entities/Address.entity';

export interface ICreateGuardianUseCaseDto {
  about?: string;

  birthDate: Date;

  address: Address;

  idUser: string;
}
