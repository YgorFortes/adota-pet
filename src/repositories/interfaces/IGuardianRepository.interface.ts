import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Guardian } from 'src/entities/Guardian.entity';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { IUpdateGuardianUseCaseDto } from 'src/useCases/guardian/updateGuardian/dtos/IUpdateGuardian.useCase.dto';

export interface IGuardianRepository {
  save(data: Guardian): Promise<Guardian>;
  findAllGuardians(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Guardian>>;
  findGuardianById(id: string): Promise<Guardian>;
  updateGuardian(id: string, updateGuardianDto: IUpdateGuardianUseCaseDto): Promise<Guardian>;
  deleteGuardian(id: string): Promise<boolean>;
}
