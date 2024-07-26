import { IUpdateUserUseCaseDto } from 'src/useCases/user/updateUser/dtos/IUpdateUser.useCase.dto';
import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';
import { ICreateGuardianUseCaseDto } from '../../createGuardian/dtos/ICreateGuardian.UseCase.dto';

export interface IUpdateGuardianUseCaseDto extends Partial<ICreateGuardianUseCaseDto> {
  user?: IUpdateUserUseCaseDto;
  address?: IUpdateAddressUseCaseDto;
}
