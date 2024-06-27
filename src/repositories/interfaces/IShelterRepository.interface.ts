import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Shelter } from 'src/entities/Shelter.entity';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { EntityManager } from 'typeorm';
import { ShelterCreateWithoutAddressDto } from 'src/useCases/shelter/updateShelter/dtos/ShelterCreateWithoutAddressDto';
import { IUpdateUserRepositoryDto } from './IUserRepository.interface';
import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';

export interface IShelterRepository {
  save(shelterdto: Shelter, transaction?: EntityManager): Promise<Shelter>;
  findAllShelters(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Shelter>>;
  findShelterById(shelterId: string): Promise<Shelter>;
  updateShelter(shelterId: string, updateShelterDto: IUpdateShelterRepositoryDto): Promise<Shelter>;
  deleteShelter(shelterId: string): Promise<boolean>;
}

export interface IUpdateShelterRepositoryDto extends Partial<ShelterCreateWithoutAddressDto> {
  user?: IUpdateUserRepositoryDto;
  address?: IUpdateAddressUseCaseDto;
}
