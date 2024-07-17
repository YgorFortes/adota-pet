import { Inject, NotFoundException } from '@nestjs/common';
import { Guardian } from 'src/entities/Guardian.entity';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';

export class FindGuardianByIdUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
  ) {}

  async execute(guardianId: string): Promise<Guardian> {
    const guadian = await this.guardianRepository.findGuardianById(guardianId);

    if (!guadian) {
      throw new NotFoundException('Guardian não encontrado.');
    }

    return guadian;
  }
}
