import { Inject, NotFoundException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';
import { IFindAllPaginationUseCaseDto } from '../../../common/dtos/IFindAllPagination.useCase.dto';
import { Guardian } from 'src/entities/Guardian.entity';
import { IPagination } from 'src/common/interfaces/IPagination.interface';

export class FindAllGuardiansUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
  ) {}

  async execute(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Guardian>> {
    const guardians = await this.guardianRepository.findAllGuardians(pagination);
    if (guardians.items.length < 1) {
      throw new NotFoundException('Guardião não encontrado.');
    }

    return guardians;
  }
}
