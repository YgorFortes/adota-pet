import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';
import { IUpdateUserUseCaseDto } from 'src/useCases/user/updateUser/dtos/IUpdateUser.useCase.dto';
import { ICreateShelterUseCaseDto } from '../../createShelter/dtos/ICreateShelter.UseCase.dto';

export interface IUpdateShelterUseCaseDto extends Partial<ICreateShelterUseCaseDto> {
  user?: IUpdateUserUseCaseDto;
  address?: IUpdateAddressUseCaseDto;
}
