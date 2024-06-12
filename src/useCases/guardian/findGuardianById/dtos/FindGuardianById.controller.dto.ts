import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindAllGuardiansControllerDto {
  @IsUUID()
  @IsNotEmpty({ message: 'id não deve ser vazio.' })
  readonly id: string;
}
