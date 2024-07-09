import { trimString } from 'src/common/helpers/validation.helpers';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

import { validateDate } from 'src/common/helpers/decoratorsValidators/isBeforeCurrentDate.decorator';
import { CreateAddressControllerDto } from 'src/useCases/address/createAddress/dtos/CreateAddress.controller.dto';
import { IsLegalAge } from 'src/common/helpers/decoratorsValidators/isLegalAge.decorator';
import { ValidateDateFormat } from 'src/common/helpers/decoratorsValidators/validateDateFormat.decorator';

export class CreateGuardianCrontollerDto {
  @Transform(trimString)
  @IsOptional()
  @IsString({ message: 'about deve ser uma string.' })
  @MaxLength(350, { message: 'about não dever ter mais de 300 caracteres.' })
  about: string;

  @IsNotEmpty({ message: 'birthDate não pode ser vazio.' })
  @ValidateDateFormat()
  @validateDate()
  @IsLegalAge()
  birthDate: Date;

  @IsNotEmpty({ message: 'address não pode ser vazio.' })
  @ValidateNested()
  @Type(() => CreateAddressControllerDto)
  address: CreateAddressControllerDto;
}
