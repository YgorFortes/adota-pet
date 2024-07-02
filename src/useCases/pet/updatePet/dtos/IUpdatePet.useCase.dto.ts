import { PetStatus } from 'src/common/enum/petStatus.enum';
import { ICreatePetUseCaseDTO } from '../../createPet/dtos/ICreatePet.useCase.dto';

export interface IUpdatePetUseCaseDto extends Partial<ICreatePetUseCaseDTO> {
  status?: PetStatus;
}
