import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { stateBrazilian } from 'src/common/enum/stateBrazilian.enum';

export interface FiltersFindAllSheltersUseCaseDto extends IFindAllPaginationUseCaseDto {
  readonly name: string;

  readonly city: string;

  readonly cep: string;

  readonly state: stateBrazilian;

  readonly neighborhood: string;
}
