import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MatchPassword } from 'src/common/helpers/decoratorsValidators/passwordConfirm.decorator';

import { UserRole } from 'src/enum/roleUser.enum';

export class CreateUserControllerDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  @IsString({ message: 'name deve ser uma string.' })
  @Length(3, 100, { message: 'name entre 3 a 100 caracteres ' })
  readonly name: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail({}, { message: 'Por favor, insira um endereço de email válido.' })
  @IsNotEmpty({ message: 'email não pode ser vazio.' })
  @MaxLength(255, { message: 'email não pode ter mais de 100 caracteres.' })
  readonly email: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'password deve ser uma string.' })
  @IsNotEmpty({ message: 'password não pode ser vazio.' })
  @Matches(/^[^\s]+$/, { message: 'password não pode conter espaços entre os caracteres.' })
  @MinLength(6, { message: 'password precisa ter pelo menos 6 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'password deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e ter no mínimo 6 caracteres.',
  })
  @MaxLength(60, { message: 'password não pode ter mais de 60 caracteres.' })
  readonly password: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MatchPassword('password', { message: 'As senhas não coincidem' })
  @MaxLength(60, { message: 'O confirmPassword não pode ter mais de 60 caracteres.' })
  readonly confirmPassword: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEnum(UserRole, {
    message: `role deve ser ${UserRole.GUARDIAN} ou ${UserRole.SHELTER}`,
  })
  readonly role: UserRole;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  @IsString({ message: 'photo deve ser uma string.' })
  @IsUrl({}, { message: 'photo deve ser uma URL válida.' })
  readonly photo?: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({ message: 'telephone não pode estar vazio.' })
  @IsString({ message: 'telephone deve ser uma string.' })
  @IsPhoneNumber('BR', {
    message: 'telephone deve ser um número de telefone válido do Brasil.',
  })
  readonly telephone: string;
}
