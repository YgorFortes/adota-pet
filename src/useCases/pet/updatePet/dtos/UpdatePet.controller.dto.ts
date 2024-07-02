import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreatePetControllerDto } from '../../createPet/dtos/CreatePet.controller.dto';
import { PetStatus } from 'src/common/enum/petStatus.enum';
import { trimString } from 'src/common/helpers/validation.helpers';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdatePetControllerDto extends PartialType(IntersectionType(CreatePetControllerDto)) {
  @Transform(trimString)
  @IsOptional()
  @IsEnum(PetStatus, {
    message: `status deve ser ${Object.values(PetStatus).join(', ')} `,
  })
  status?: PetStatus;
}
