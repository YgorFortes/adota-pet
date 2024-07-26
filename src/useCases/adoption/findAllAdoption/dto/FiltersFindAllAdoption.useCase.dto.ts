import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';

export interface IFilterFindAllAdoptionUseCaseDto extends IFindAllPaginationUseCaseDto {
  startDate: Date;

  endDate: Date;
}
