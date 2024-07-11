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

@Injectable()
export class AdoptionRepository
  extends BaseRepository<AdoptionEntity>
  implements IAdoptionRepository
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(AdoptionEntity, dataSource, request);
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
    const adoptionCreated = await this.repository.save(adoptionDto);

    const adoption = this.formatAdoptionProprieties(adoptionCreated);

    return adoption;
  }

  async deleteAdoption(adoptionId: string): Promise<boolean> {
    const adoptionDeleted = await this.repository.delete(adoptionId);

    if (adoptionDeleted.affected > 0) {
      return true;
    }
  }

  private formatAdoptionProprieties(adoption: AdoptionEntity): AdoptionWithoutGuardianAndPet {
    return {
      id: adoption.id,
      adoptionDate: adoption.adoptionDate,
      status: adoption.status,
      notes: adoption.notes,
      createdAt: adoption.createdAt,
      updatedAt: adoption.updatedAt,
      deletedAt: adoption.deletedAt,
    };
  }
}