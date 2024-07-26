import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';
import { ICreateGuardianUseCaseDto } from './dtos/ICreateGuardian.UseCase.dto';
import { Guardian } from 'src/entities/Guardian.entity';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { Address } from 'src/entities/Address.entity';

@Injectable()
export class CreateGuardianUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
  ) {}

  async execute(
    guardianDto: ICreateGuardianUseCaseDto,
    user: User,
    address: Address,
  ): Promise<Guardian> {
    const { about, birthDate } = guardianDto;

    const guardian = new Guardian({
      about,
      birthDate,
      address: address,
      user,
    });

    const guardianCreated = await this.guardianRepository.save(guardian);

    return guardianCreated;
  }
}
