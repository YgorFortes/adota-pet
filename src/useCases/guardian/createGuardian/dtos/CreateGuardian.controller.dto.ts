import { trimString } from 'src/common/helpers/validation.helpers';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { IsBrazilianDate } from 'src/common/helpers/decoratorsValidators/isBrazilianDate.decorator';
import { isBeforeCurrentDate } from 'src/common/helpers/decoratorsValidators/isBeforeCurrentDate.decorator';
import { CreateAddressControllerDto } from 'src/useCases/address/createAddress/dtos/CreateAddress.controller.dto';
import { IsLegalAge } from 'src/common/helpers/decoratorsValidators/isLegalAge.decorator';

export class GuardianCrontollerDto {
  @Transform(trimString)
  @IsOptional()
  @IsString({ message: 'about deve ser uma string.' })
  @MaxLength(350, { message: 'about não dever ter mais de 300 caracteres.' })
  about: string;

  @IsNotEmpty({ message: 'birthDate não pode ser vazio.' })
  @isBeforeCurrentDate()
  @IsBrazilianDate()
  @IsLegalAge()
  birthDate: Date;

  @IsNotEmpty({ message: 'address não pode ser vazio.' })
  @ValidateNested()
  @Type(() => CreateAddressControllerDto)
  address: CreateAddressControllerDto;
}
