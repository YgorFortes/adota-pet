import { Address } from 'src/entities/Address.entity';
import { ICreateAddressDto } from 'src/useCases/address/createAddress/dtos/ICreateAddress.useCase.dto';
import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';

export interface IAddressRepository {
  save(addressDto: ICreateAddressDto): Promise<Address>;
  updateAddress(id: string, updateAddressDto: IUpdateAddressUseCaseDto): Promise<Address>;
}
