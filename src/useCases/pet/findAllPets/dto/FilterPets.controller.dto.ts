import { Transform, TransformFnParams } from 'class-transformer';
import { IsEnum, IsOptional, IsPostalCode, IsString } from 'class-validator';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';
import { PetSize } from 'src/common/enum/petSize.enum';
import { PetSpecie } from 'src/common/enum/petSpecie.enum';
import { trimString } from 'src/common/helpers/validation.helpers';

export class FilterPetsControllerDto extends FindAllPaginationControllerDto {
  @IsOptional()
  @IsEnum(PetSpecie, {
    message: `specie deve ser dos tipos: ${Object.values(PetSpecie).join(', ')}`,
  })
  specie: PetSpecie;

  @Transform(trimString)
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.replace(/^(\d{5})(\d{3})$/, '$1-$2'))
  @IsString({ message: 'cep deve ser uma string.' })
  @IsPostalCode('BR', { message: 'CEP inválido' })
  cep: string;

  @IsOptional()
  @IsEnum(PetSize, {
    message: `size deve ser dos tipos: ${Object.values(PetSize).join(', ')}`,
  })
  size: PetSize;
}
