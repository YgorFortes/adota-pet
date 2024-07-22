import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdParamControllerDto {
  @IsUUID('all', { message: 'O id deve ser do tipo uuid' })
  @IsNotEmpty({ message: 'id não deve ser vazio.' })
  readonly id: string;
}
