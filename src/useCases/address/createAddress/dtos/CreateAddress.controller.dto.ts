/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
  MaxLength,
  Validate,
  ValidateIf,
  ValidationArguments,
  isIn,
} from 'class-validator';
import { stateBrazilian } from 'src/enum/stateBrazilian.enum';
import { trimString, isCepMissing, otherFieldWithCep } from 'src/common/helpers/validation.helpers';
import { ValidateCepWithoutOtherFields } from 'src/common/helpers/decoratorsValidators/cepWithoutOtherFields.decorator';

export class CreateAddressControllerDto {
  @Transform(trimString)
  @IsNotEmpty({ message: 'city não pode ser vazio.' })
  @IsString({ message: 'city deve ser uma string.' })
  @MaxLength(45, { message: 'city não pode ter mais de 45 caracteres.' })
  @ValidateIf(isCepMissing)
  readonly city: string;

  @Transform(trimString)
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.replace(/^(\d{5})(\d{3})$/, '$1-$2'))
  @IsString({ message: 'cep deve ser uma string.' })
  @IsPostalCode('BR', { message: 'CEP inválido' })
  @ValidateCepWithoutOtherFields(this)
  readonly cep: string;

  @Transform(trimString)
  @IsNotEmpty({ message: 'state não pode ser vazio.' })
  @IsString({ message: 'state deve ser uma string.' })
  @MaxLength(45, { message: 'state não pode ter mais de 45 caracteres.' })
  @IsIn(Object.values(stateBrazilian), {
    message: (args: ValidationArguments) =>
      `${args.value} não é um estado válido. Por favor, insira a sigla em maiúscula. Exemplo: GO = Goiás`,
  })
  @ValidateIf(isCepMissing)
  readonly state: string;

  @Transform(trimString)
  @IsNotEmpty({ message: 'street não pode ser vazio.' })
  @IsString({ message: 'street deve ser uma string.' })
  @MaxLength(45, { message: 'street não pode ter mais de 45 caracteres.' })
  @ValidateIf(isCepMissing)
  readonly street: string;

  @Transform(trimString)
  @IsOptional()
  @IsString({ message: 'complement deve ser uma string.' })
  @MaxLength(45, { message: 'complement não pode ter mais de 45 caracteres.' })
  readonly complement: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'neighborhood deve ser uma string.' })
  @MaxLength(45, { message: 'neighborhood não pode ter mais de 45 caracteres.' })
  @ValidateIf(isCepMissing)
  readonly neighborhood: string;
}
