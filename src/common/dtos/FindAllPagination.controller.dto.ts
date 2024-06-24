import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class FindAllPaginationControllerDto {
  @Type(() => Number)
  @IsInt({ message: 'page deve ser um número inteiro.' })
  @Min(1, { message: 'O valor mínimo para a page é 1.' })
  @IsOptional()
  readonly page: number;

  @Type(() => Number)
  @IsInt({ message: 'O limit deve ser um número inteiro.' })
  @Min(1, { message: 'O valor mínimo para o limit é 1.' })
  @Max(100, { message: 'O valor máximo para o limit é 100.' })
  @IsOptional()
  readonly limit: number;

  constructor() {
    this.page = 1;
    this.limit = 10;
  }
}
