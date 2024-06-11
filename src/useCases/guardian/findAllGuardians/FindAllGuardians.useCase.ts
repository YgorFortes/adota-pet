import { Inject } from '@nestjs/common';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';
import { IFindAllGuardiansUseCaseDto } from './dtos/IFindAllGuardins.useCase.dto';
import { Guardian } from 'src/entities/Guardian.entity';
import { IPagination } from 'src/common/interfaces/IPagination.interface';

export class FindAllGuardiansUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
  ) {}

  async execute(pagination: IFindAllGuardiansUseCaseDto): Promise<IPagination<Guardian>> {
    return this.guardianRepository.findAllGuardians(pagination);
  }
}
