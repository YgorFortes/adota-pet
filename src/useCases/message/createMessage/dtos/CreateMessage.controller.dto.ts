import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateMessageControllerDto {
  @IsUUID('all', { message: 'O shelterId deve ser do tipo uuid' })
  @IsNotEmpty({ message: 'shelterId não deve ser vazio.' })
  shelterId: string;

  @IsUUID('all', { message: 'O petId deve ser do tipo uuid' })
  @IsNotEmpty({ message: 'petId não deve ser vazio.' })
  petId: string;

  @IsString()
  @IsNotEmpty({ message: 'content não pode ser vazio.' })
  @Length(1, 255, { message: 'O campo content deve ter entre 1 e 255 caracteres' })
  content: string;
}
