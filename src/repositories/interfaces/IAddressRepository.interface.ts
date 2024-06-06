import { Address } from 'src/entities/Address.entity';
import { ICreateAddressDto } from 'src/useCases/address/createAddress/dtos/ICreateAddress.useCase.dto';

export interface IAddressRepository {
  save(addressDto: ICreateAddressDto): Promise<Address>;
}
