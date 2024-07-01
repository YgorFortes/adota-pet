import { PetSize } from 'src/enum/petSize.enum';
import { PetSpecie } from 'src/enum/petSpecie.enum';
import { IImageFile } from 'src/useCases/user/createUser/dtos/IImageFile';

export interface ICreatePetUseCaseDTO {
  name: string;

  birthDate?: Date;

  image: IImageFile;

  size: PetSize;

  behavior: string;

  specie: PetSpecie;
}
