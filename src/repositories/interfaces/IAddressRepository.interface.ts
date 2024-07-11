import { Address } from 'src/entities/Address.entity';
import { ICreateAddressDto } from 'src/useCases/address/createAddress/dtos/ICreateAddress.useCase.dto';
import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';
import { EntityManager } from 'typeorm';

export interface IAddressRepository {
  findAddress(cep: string): Promise<Address>;
  save(addressDto: ICreateAddressDto, transaction?: EntityManager): Promise<Address>;
  updateAddress(id: string, updateAddressDto: IUpdateAddressUseCaseDto): Promise<Address>;
}
