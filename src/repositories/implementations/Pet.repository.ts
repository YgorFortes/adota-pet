import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository } from '../interfaces/IPetRepository.interface';
import { BaseRepository } from './BaseRepository';
import { PetEntity } from 'src/infra/db/entities/Pet.entity';
import { DataSource } from 'typeorm';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export class PetRepository extends BaseRepository<PetEntity> implements IPetRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(PetEntity, dataSource, request);
  }

  async savePet(petDto: Pet): Promise<Pet> {
    const petCreated = await this.repository.save(petDto);

    return petCreated;
  }
}
