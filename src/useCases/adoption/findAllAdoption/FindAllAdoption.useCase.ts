import { Inject } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Adoption } from 'src/entities/Adoption.entity';
import { IAdoptionRepository } from 'src/repositories/interfaces/IAdoptionRepository.interface';
import { IFilterFindAllAdoptionUseCaseDto } from './dto/FiltersFindAllAdoption.useCase.dto';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { UserRole } from 'src/common/enum/roleUser.enum';

export class FindAllAdoptionUseCase {
  constructor(
    @Inject(RepositoryType.IAdoptionRepository) private adoptionRepository: IAdoptionRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute(
    filters: IFilterFindAllAdoptionUseCaseDto,
    userId: string,
  ): Promise<IPagination<Adoption>> {
    const shelterUser = await this.findUserByIdUseCase.execute(userId, UserRole.SHELTER);
    const { shelter } = shelterUser;

    const adoptions = await this.adoptionRepository.findAllAdoption(filters, shelter.id);
    return adoptions;
  }
}
