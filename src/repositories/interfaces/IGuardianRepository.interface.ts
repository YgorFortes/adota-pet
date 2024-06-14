import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Guardian } from 'src/entities/Guardian.entity';
import { IFindAllGuardiansUseCaseDto } from 'src/useCases/guardian/findAllGuardians/dtos/IFindAllGuardins.useCase.dto';
import { IUpdateGuardianUseCaseDto } from 'src/useCases/guardian/updateGuardian/dtos/IUpdateGuardian.useCase.dto';

export interface IGuardianRepository {
  save(data: Guardian): Promise<Guardian>;
  findAllGuardians(pagination: IFindAllGuardiansUseCaseDto): Promise<IPagination<Guardian>>;
  findGuardianById(id: string): Promise<Guardian>;
  updateGuardian(id: string, updateGuardianDto: IUpdateGuardianUseCaseDto): Promise<Guardian>;
}
