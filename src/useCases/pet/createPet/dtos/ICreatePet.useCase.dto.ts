import { PetSize } from 'src/common/enum/petSize.enum';
import { PetSpecie } from 'src/common/enum/petSpecie.enum';
import { IImageFile } from 'src/useCases/user/createUser/dtos/IImageFile';

export interface ICreatePetUseCaseDTO {
  name: string;

  birthDate?: Date;

  image: IImageFile;

  size: PetSize;

  behavior: string;

  specie: PetSpecie;
}
