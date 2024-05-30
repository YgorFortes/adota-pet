import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthenticationUserDtoController {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail({}, { message: 'Por favor, insira um endereço de email válido.' })
  @IsNotEmpty({ message: 'email não pode estar vazio.' })
  @MaxLength(255, { message: 'email não pode ter mais de 100 caracteres.' })
  readonly email: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'password deve ser uma string.' })
  @IsNotEmpty({ message: 'password não pode ser vazio.' })
  @MinLength(6, { message: 'password precisa ter pelo menos 6 caracteres' })
  @MaxLength(60, { message: 'password não pode ter mais de 60 caracteres.' })
  readonly password: string;
}
