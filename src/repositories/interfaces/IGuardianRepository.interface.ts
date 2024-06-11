import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Guardian } from 'src/entities/Guardian.entity';
import { IFindAllGuardiansUseCaseDto } from 'src/useCases/guardian/findAllGuardians/dtos/IFindAllGuardins.useCase.dto';

export interface IGuardianRepository {
  save(data: Guardian): Promise<Guardian>;
  findAllGuardians(pagination: IFindAllGuardiansUseCaseDto): Promise<IPagination<Guardian>>;
}
