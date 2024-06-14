import { ICreateAddressDto } from '../../createAddress/dtos/ICreateAddress.useCase.dto';

export interface IUpdateAddressUseCaseDto extends Partial<ICreateAddressDto> {}
