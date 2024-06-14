import { IUpdateUserUseCaseDto } from 'src/useCases/user/updateUser/dtos/IUpdateUser.useCase.dto';
import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';
import { GuardianCreationWithoutAddressDto } from './GuardianCreationWithoutAddressDto';

export interface IUpdateGuardianUseCaseDto extends Partial<GuardianCreationWithoutAddressDto> {
  user?: IUpdateUserUseCaseDto;
  address?: IUpdateAddressUseCaseDto;
}
