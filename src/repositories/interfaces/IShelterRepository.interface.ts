import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Shelter } from 'src/entities/Shelter.entity';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { EntityManager } from 'typeorm';
import { IUpdateUserRepositoryDto } from './IUserRepository.interface';
import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';
import { ICreateShelterUseCaseDto } from 'src/useCases/shelter/createShelter/dtos/ICreateShelter.UseCase.dto';

export interface IShelterRepository {
  save(shelterdto: Shelter, transaction?: EntityManager): Promise<Shelter>;
  findAllShelters(filters: IFindAllPaginationUseCaseDto): Promise<IPagination<Shelter>>;
  findShelterById(shelterId: string): Promise<Shelter>;
  updateShelter(shelterId: string, updateShelterDto: IUpdateShelterRepositoryDto): Promise<Shelter>;
  deleteShelter(shelterId: string): Promise<boolean>;
}

export interface IUpdateShelterRepositoryDto extends Partial<ICreateShelterUseCaseDto> {
  user?: IUpdateUserRepositoryDto;
  address?: IUpdateAddressUseCaseDto;
}
