import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsIn,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
  MaxLength,
  ValidationArguments,
} from 'class-validator';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';
import { stateBrazilian } from 'src/common/enum/stateBrazilian.enum';
import { trimString } from 'src/common/helpers/validation.helpers';

export class FiltersFindAllSheltersDto extends FindAllPaginationControllerDto {
  @Transform(trimString)
  @IsOptional()
  @IsString({ message: 'name deve ser uma string.' })
  @Length(3, 100, { message: 'name entre 3 a 100 caracteres ' })
  readonly name: string;

  @Transform(trimString)
  @IsOptional()
  @IsString({ message: 'city deve ser uma string.' })
  @MaxLength(45, { message: 'city não pode ter mais de 45 caracteres.' })
  readonly city: string;

  @Transform(trimString)
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.replace(/^(\d{5})(\d{3})$/, '$1-$2'))
  @IsString({ message: 'cep deve ser uma string.' })
  @IsPostalCode('BR', { message: 'CEP inválido' })
  readonly cep: string;

  @Transform(trimString)
  @IsOptional()
  @IsString({ message: 'state deve ser uma string.' })
  @MaxLength(45, { message: 'state não pode ter mais de 45 caracteres.' })
  @IsIn(Object.values(stateBrazilian), {
    message: (args: ValidationArguments) =>
      `${args.value} não é um estado válido. Por favor, insira a sigla em maiúscula. Exemplo: GO = Goiás`,
  })
  readonly state: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'neighborhood deve ser uma string.' })
  @IsOptional()
  @MaxLength(45, { message: 'neighborhood não pode ter mais de 45 caracteres.' })
  readonly neighborhood: string;
}
