import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Pet } from 'src/entities/Pet.entity';

export interface IPetRepository {
  savePet(petDto: Pet): Promise<Pet>;
  findAllPets(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Pet>>;
  findPetById(petId: string): Promise<Pet>;
}
