import { IsOptional } from 'class-validator';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';

import { ValidateDateFormat } from 'src/common/helpers/decoratorsValidators/validateDateFormat.decorator';

export class FilterFindAllAdoptionControllerDto extends FindAllPaginationControllerDto {
  @IsOptional()
  @ValidateDateFormat()
  startDate: Date;

  @IsOptional()
  @ValidateDateFormat()
  endDate: Date;
}
