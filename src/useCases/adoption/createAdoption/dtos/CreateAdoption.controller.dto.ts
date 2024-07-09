import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { validateDate } from 'src/common/helpers/decoratorsValidators/isBeforeCurrentDate.decorator';
import { ValidateDateFormat } from 'src/common/helpers/decoratorsValidators/validateDateFormat.decorator';

import { trimString } from 'src/common/helpers/validation.helpers';

export class CreateAdoptionControllerDto {
  @IsUUID('all', { message: 'O petId deve ser do tipo uuid' })
  @IsNotEmpty({ message: 'petId não deve ser vazio.' })
  readonly petId: string;

  @IsUUID('all', { message: 'O guardianId deve ser do tipo uuid' })
  @IsNotEmpty({ message: 'guardianId não deve ser vazio.' })
  readonly guardianId: string;

  @Transform(trimString)
  @IsString({ message: 'notes deve ser uma string.' })
  @MaxLength(350, { message: 'notes não dever ter mais de 350 caracteres.' })
  @IsOptional()
  notes?: string;

  @validateDate('after')
  @IsNotEmpty({ message: 'adoptionDate não deve ser vazio.' })
  @ValidateDateFormat()
  adoptionDate: Date;
}
