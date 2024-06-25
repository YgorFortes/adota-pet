import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';
import { ShelterCreateWithoutAddressDto } from './ShelterCreateWithoutAddressDto';
import { IUpdateUserUseCaseDto } from 'src/useCases/user/updateUser/dtos/IUpdateUser.useCase.dto';

export interface IUpdateShelterUseCaseDto extends Partial<ShelterCreateWithoutAddressDto> {
  user?: IUpdateUserUseCaseDto;
  address?: IUpdateAddressUseCaseDto;
}
