import { Inject, NotFoundException } from '@nestjs/common';
import { Guardian } from 'src/entities/Guardian.entity';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';

export class FindGuardianByIdUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
  ) {}

  async execute(id: string): Promise<Guardian> {
    const guadian = await this.guardianRepository.findGuardianById(id);

    if (!guadian) {
      throw new NotFoundException('Guardian não encontrado.');
    }

    return guadian;
  }
}
