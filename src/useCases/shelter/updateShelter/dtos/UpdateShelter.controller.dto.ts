import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUserControlleDto } from 'src/useCases/user/updateUser/dtos/UpdateUser.controller.dto';
import { UpdateAddressControllerDto } from 'src/useCases/address/updateAddress/dtos/UpdateAddress.controller.dto';

import { CreateShelterControllerDto } from '../../createShelter/dtos/CreateShelter.controller.dto';

export class UpdateShelterControllerDto extends PartialType(
  IntersectionType(CreateShelterControllerDto),
) {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserControlleDto)
  user: UpdateUserControlleDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressControllerDto)
  address: UpdateAddressControllerDto;
}
