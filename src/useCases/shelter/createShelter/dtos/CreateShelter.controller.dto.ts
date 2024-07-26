import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, Matches, MaxLength } from 'class-validator';
import { trimString } from 'src/common/helpers/validation.helpers';

export class CreateShelterControllerDto {
  @Transform(trimString)
  @IsString({ message: 'about deve ser uma string.' })
  @MaxLength(350, { message: 'about não dever ter mais de 300 caracteres.' })
  @IsNotEmpty({ message: 'about não pode ser vazio.' })
  readonly about: string;

  @Transform(trimString)
  @IsUrl({}, { message: 'webSite deve ser uma URL válida.' })
  @IsNotEmpty({ message: 'webSite não pode ser vazio.' })
  @Matches(/^(https?:\/\/)/, { message: 'webSite deve começar com http:// ou https://.' })
  readonly webSite: string;

  @IsString({ message: 'workingHours deve ser uma string.' })
  @Transform(trimString)
  @IsNotEmpty({ message: 'workingHours não pode ser vazio.' })
  readonly workingHours: string;
}
