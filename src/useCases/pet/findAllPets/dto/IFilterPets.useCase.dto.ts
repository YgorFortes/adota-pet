import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { PetSize } from 'src/common/enum/petSize.enum';
import { PetSpecie } from 'src/common/enum/petSpecie.enum';

export interface IFilterPetsUseCaseDto extends IFindAllPaginationUseCaseDto {
  specie: PetSpecie;

  cep: string;

  size: PetSize;
}
