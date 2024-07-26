import { Inject, Injectable } from '@nestjs/common';
import { AdoptionEntity } from 'src/infra/db/entities/Adoption.entity';
import {
  IAdoptionRepository,
  AdoptionWithoutGuardianAndPet,
} from '../interfaces/IAdoptionRepository.interface';
import { Adoption } from 'src/entities/Adoption.entity';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { BaseRepository } from './BaseRepository';
import { Request } from 'express';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { IFilterFindAllAdoptionUseCaseDto } from 'src/useCases/adoption/findAllAdoption/dto/FiltersFindAllAdoption.useCase.dto';

@Injectable()
export class AdoptionRepository
  extends BaseRepository<AdoptionEntity>
  implements IAdoptionRepository
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(AdoptionEntity, dataSource, request);
  }

  async findAllAdoption(
    filters: IFilterFindAllAdoptionUseCaseDto,
    shelterId: string,
  ): Promise<IPagination<Adoption>> {
    const queryBuilder = this.repository.createQueryBuilder('adoption');

    queryBuilder.skip((filters.page - 1) * filters.limit).take(filters.limit);

    queryBuilder
      .leftJoin('adoption.pet', 'pet')
      .leftJoin('pet.shelter', 'shelter')
      .andWhere('shelter.id =:shelterId', { shelterId });

    if (filters.startDate && filters.endDate) {
      queryBuilder.andWhere('adoption.adoption_date BETWEEN :startDate AND :endDate', {
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
    } else if (filters.startDate) {
      queryBuilder.andWhere('adoption.adoption_date >= :startDate', {
        startDate: filters.startDate,
      });
    } else if (filters.endDate) {
      queryBuilder.andWhere('adoption.adoption_date <= :endDate', {
        endDate: filters.endDate,
      });
    }

    const [adoptions, adoptionsCount] = await Promise.all([
      queryBuilder.getMany(),
      queryBuilder.getCount(),
    ]);

    const counterPage = Math.ceil(adoptionsCount / filters.limit);

    return { items: adoptions, meta: { counterPage, totalCount: adoptionsCount } };
  }

  async findAdoptionById(adoptionId: string, userId?: string): Promise<Adoption> {
    const queryBuilder = this.repository.createQueryBuilder('adoption');
    queryBuilder.where('adoption.id =:id', { id: adoptionId });
    if (userId) {
      queryBuilder
        .leftJoinAndSelect('adoption.pet', 'pet')
        .leftJoinAndSelect('pet.shelter', 'shelter')
        .leftJoinAndSelect('shelter.user', 'user')
        .andWhere('user.id =:userId', { userId });
    }

    const adoption = await queryBuilder.getOne();
    return adoption;
  }

  async saveAdoption(adoptionDto: Adoption): Promise<AdoptionWithoutGuardianAndPet> {
    const { guardian, pet, ...adoptionDtoWithoutPetAndGuardian } = adoptionDto;
    const adoptionCreated = await this.repository.save({
      ...adoptionDtoWithoutPetAndGuardian,
      petId: pet.id,
      guardianId: guardian.id,
    });

    return adoptionCreated;
  }

  async deleteAdoption(adoptionId: string): Promise<boolean> {
    const adoptionDeleted = await this.repository.delete(adoptionId);

    if (adoptionDeleted.affected > 0) {
      return true;
    }
  }
}
