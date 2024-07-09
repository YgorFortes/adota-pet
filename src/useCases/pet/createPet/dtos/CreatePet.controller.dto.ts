import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { validateDate } from 'src/common/helpers/decoratorsValidators/isBeforeCurrentDate.decorator';

import { trimString } from 'src/common/helpers/validation.helpers';
import { PetSize } from 'src/common/enum/petSize.enum';
import { PetSpecie } from 'src/common/enum/petSpecie.enum';
import { ValidateDateFormat } from 'src/common/helpers/decoratorsValidators/validateDateFormat.decorator';

export class CreatePetControllerDto {
  @Transform(trimString)
  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  @IsString({ message: 'name deve ser uma string.' })
  @Length(3, 255, { message: 'name entre 3 a 100 caracteres ' })
  readonly name: string;

  @validateDate()
  @IsOptional()
  @ValidateDateFormat({})
  readonly birthDate?: Date;

  @Transform(trimString)
  @IsNotEmpty({ message: 'size não pode ser vazio.' })
  @IsEnum(PetSize, {
    message: `size deve ser dos tipos: ${Object.values(PetSize).join(', ')}`,
  })
  readonly size: PetSize;

  @Transform(trimString)
  @IsNotEmpty({ message: 'behavior não pode ser vazio.' })
  @Length(3, 100, { message: 'behavior entre 3 a 100 caracteres ' })
  readonly behavior: string;

  @Transform(trimString)
  @IsNotEmpty({ message: 'specie não pode ser vazio.' })
  @IsEnum(PetSpecie, {
    message: `specie deve ser dos tipos: ${Object.values(PetSpecie).join(', ')}`,
  })
  readonly specie: PetSpecie;
}
