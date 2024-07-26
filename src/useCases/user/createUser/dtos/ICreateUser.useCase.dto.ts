import { UserRole } from 'src/common/enum/roleUser.enum';
import { IImageFile } from './IImageFile';
import { ICreateGuardianUseCaseDto } from 'src/useCases/guardian/createGuardian/dtos/ICreateGuardian.UseCase.dto';
import { ICreateAddressDto } from 'src/useCases/address/createAddress/dtos/ICreateAddress.useCase.dto';
import { ICreateShelterUseCaseDto } from 'src/useCases/shelter/createShelter/dtos/ICreateShelter.UseCase.dto';

export interface ICreateUserUseCaseDTO {
  name: string;

  email: string;

  password: string;

  role: UserRole;

  photo: IImageFile;

  telephone: string;

  guardian?: ICreateGuardianUseCaseDto;

  shelter?: ICreateShelterUseCaseDto;

  address: ICreateAddressDto;
}
