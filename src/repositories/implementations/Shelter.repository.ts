import { Inject, Injectable, Scope } from '@nestjs/common';
import { IShelterRepository } from '../interfaces/IShelterRepository.interface';
import { Shelter } from 'src/entities/Shelter.entity';
import { DataSource } from 'typeorm';
import { ShelterEntity } from 'src/infra/db/entities/Shelter.entity';
import { BaseRepository } from './BaseRepository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ShelterRepository extends BaseRepository<ShelterEntity> implements IShelterRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(ShelterEntity, dataSource, request);
  }

  async save(shelterdto: Shelter): Promise<Shelter> {
    const shelterCreated = await this.repository.save(shelterdto);

    const shelterFormated = this.formatShelterProperties(shelterCreated);
    return shelterFormated;
  }

  private formatShelterProperties(shelter: ShelterEntity): Shelter {
    if (!shelter) {
      return null;
    }

    const { id, user, about, webSite, address, workingHours, createdAt, updatedAt, deletedAt } =
      shelter;

    const shelterFormated = {
      id,
      user,
      about,
      webSite,
      workingHours,
      address,
      createdAt,
      updatedAt,
      deletedAt,
    };

    return shelterFormated;
  }
}
