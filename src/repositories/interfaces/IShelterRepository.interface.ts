import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Shelter } from 'src/entities/Shelter.entity';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { EntityManager } from 'typeorm';

export interface IShelterRepository {
  save(shelterdto: Shelter, transaction?: EntityManager): Promise<Shelter>;
  findAllShelters(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Shelter>>;
}
