import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Adoption } from 'src/entities/Adoption.entity';
import { IFilterFindAllAdoptionUseCaseDto } from 'src/useCases/adoption/findAllAdoption/dto/FiltersFindAllAdoption.useCase.dto';

export type AdoptionWithoutGuardianAndPet = Omit<Adoption, 'guardian' | 'pet'>;

export interface IAdoptionRepository {
  saveAdoption(adoptionDto: Adoption): Promise<AdoptionWithoutGuardianAndPet>;
  findAllAdoption(
    filters: IFilterFindAllAdoptionUseCaseDto,
    shelterId: string,
  ): Promise<IPagination<Adoption>>;
  findAdoptionById(adoptionId: string, userId?: string): Promise<Adoption>;
  deleteAdoption(adoptionId: string): Promise<boolean>;
}
