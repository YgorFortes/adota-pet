import { Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { MatchPassword } from 'src/common/helpers/decoratorsValidators/passwordConfirm.decorator';
import { PasswordIsTyped } from 'src/common/helpers/decoratorsValidators/passwordIsTyped.decorator';
import { roleIsOneOf, trimString } from 'src/common/helpers/validation.helpers';

import { UserRole } from 'src/common/enum/roleUser.enum';
import { ValidateEmail } from 'src/common/helpers/decoratorsValidators/validateEmailDomains.decorator';
import { CreateShelterControllerDto } from 'src/useCases/shelter/createShelter/dtos/CreateShelter.controller.dto';
import { CreateGuardianCrontollerDto } from 'src/useCases/guardian/createGuardian/dtos/CreateGuardian.controller.dto';
import { CreateAddressControllerDto } from 'src/useCases/address/createAddress/dtos/CreateAddress.controller.dto';

export class CreateUserControllerDto {
  @Transform(trimString)
  @IsNotEmpty({ message: 'name não pode ser vazio.' })
  @IsString({ message: 'name deve ser uma string.' })
  @Length(3, 100, { message: 'name entre 3 a 100 caracteres ' })
  readonly name: string;

  @Transform(trimString)
  @IsEmail({}, { message: 'Por favor, insira um endereço de email válido.' })
  @IsNotEmpty({ message: 'email não pode ser vazio.' })
  @ValidateEmail()
  @MaxLength(255, { message: 'email não pode ter mais de 100 caracteres.' })
  readonly email: string;

  @Transform(trimString)
  @PasswordIsTyped()
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

  @Transform(trimString)
  @IsDefined({ message: 'confirmPassword é obrigatório quando password é fornecido.' })
  @MatchPassword('password', { message: 'As senhas não coincidem' })
  @MaxLength(60, { message: 'O confirmPassword não pode ter mais de 60 caracteres.' })
  readonly confirmPassword: string;

  @Transform(trimString)
  @IsEnum(UserRole, {
    message: `role deve ser ${UserRole.GUARDIAN} ou ${UserRole.SHELTER}`,
  })
  readonly role: UserRole;

  @Transform(trimString)
  @IsNotEmpty({ message: 'telephone não pode estar vazio.' })
  @IsString({ message: 'telephone deve ser uma string.' })
  @IsPhoneNumber('BR', {
    message: 'telephone deve ser um número de telefone válido do Brasil.',
  })
  readonly telephone: string;

  @ValidateIf(roleIsOneOf([UserRole.SHELTER]))
  @IsNotEmpty({ message: 'shelter não pode ser vazio.' })
  @ValidateNested({ message: 'Os campos about, webSite, workingHours e address são obrigatórios.' })
  @Type(() => CreateShelterControllerDto)
  readonly shelter: CreateShelterControllerDto;

  @ValidateIf(roleIsOneOf([UserRole.GUARDIAN]))
  @IsNotEmpty({ message: 'guardian não pode ser vazio.' })
  @ValidateNested({ message: 'Os campos about, birthDate e address são obrigatórios.' })
  @Type(() => CreateGuardianCrontollerDto)
  readonly guardian: CreateGuardianCrontollerDto;

  @IsNotEmpty({ message: 'address não pode ser vazio.' })
  @ValidateNested()
  @Type(() => CreateAddressControllerDto)
  address: CreateAddressControllerDto;
}
