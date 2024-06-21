import { Inject, Injectable, Scope } from '@nestjs/common';
import { IShelterRepository } from '../interfaces/IShelterRepository.interface';
import { Shelter } from 'src/entities/Shelter.entity';
import { DataSource } from 'typeorm';
import { ShelterEntity } from 'src/infra/db/entities/Shelter.entity';
import { BaseRepository } from '../BaseRepository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ShelterRepository extends BaseRepository implements IShelterRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  } // private readonly shelterRepository: Repository<ShelterEntity>, // @InjectRepository(ShelterEntity)

  async save(shelterdto: Shelter): Promise<Shelter> {
    const shelterRepository = this.getRepository(ShelterEntity);
    const shelterCreated = await shelterRepository.save(shelterdto);

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
