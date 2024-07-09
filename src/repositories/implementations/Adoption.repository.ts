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
  async saveAdoption(adoptionDto: Adoption): Promise<AdoptionWithoutGuardianAndPet> {
    const adoptionCreated = await this.repository.save(adoptionDto);

    const adoption = this.formatAdoptionProprieties(adoptionCreated);

    return adoption;
  }

  async findOneAdoption(adoptionId: string): Promise<Adoption> {
    const adoption = await this.repository.findOne({
      where: { id: adoptionId },
    });

    return adoption;
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
