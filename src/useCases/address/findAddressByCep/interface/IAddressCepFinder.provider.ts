import { Address } from 'src/entities/Address.entity';

export interface IAddressCepFinderProvider {
  findAddressByCep(cep: string, complement?: string): Promise<Address>;
}
