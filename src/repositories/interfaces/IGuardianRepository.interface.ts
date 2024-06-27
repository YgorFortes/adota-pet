import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Guardian } from 'src/entities/Guardian.entity';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { IUpdateUserRepositoryDto } from './IUserRepository.interface';
import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';
import { GuardianCreationWithoutAddressDto } from 'src/useCases/guardian/updateGuardian/dtos/GuardianCreationWithoutAddressDto';

export interface IGuardianRepository {
  save(data: Guardian): Promise<Guardian>;
  findAllGuardians(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Guardian>>;
  findGuardianById(id: string): Promise<Guardian>;
  updateGuardian(id: string, updateGuardianDto: IUpdateGuardianRepositoryDto): Promise<Guardian>;
  deleteGuardian(id: string): Promise<boolean>;
}

export interface IUpdateGuardianRepositoryDto extends Partial<GuardianCreationWithoutAddressDto> {
  user?: IUpdateUserRepositoryDto;
  address?: IUpdateAddressUseCaseDto;
}
