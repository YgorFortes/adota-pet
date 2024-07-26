import { PetStatus } from 'src/common/enum/petStatus.enum';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Pet } from 'src/entities/Pet.entity';
import { IFilterPetsUseCaseDto } from 'src/useCases/pet/findAllPets/dto/IFilterPets.useCase.dto';
import { IUpdatePetUseCaseDto } from 'src/useCases/pet/updatePet/dtos/IUpdatePet.useCase.dto';

export interface IPetRepository {
  savePet(petDto: Pet): Promise<Pet>;
  findAllPets(filters: IFilterPetsUseCaseDto, shelterId?: string): Promise<IPagination<Pet>>;
  findPetById(petId: string, shelterId?: string): Promise<Pet>;
  updatePet(petId: string, petUpdateDto: IUpdatePetRepositoryDto): Promise<Pet>;
  deletePet(petId: string): Promise<boolean>;
}

export interface IUpdatePetRepositoryDto extends Partial<Omit<IUpdatePetUseCaseDto, 'photo'>> {
  photo?: string;
  status?: PetStatus;
}
