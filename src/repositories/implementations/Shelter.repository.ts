import { Inject, Injectable, Scope } from '@nestjs/common';
import { IShelterRepository } from '../interfaces/IShelterRepository.interface';
import { Shelter } from 'src/entities/Shelter.entity';
import { DataSource } from 'typeorm';
import { ShelterEntity } from 'src/infra/db/entities/Shelter.entity';
import { BaseRepository } from './BaseRepository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';

@Injectable({ scope: Scope.REQUEST })
export class ShelterRepository extends BaseRepository<ShelterEntity> implements IShelterRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(ShelterEntity, dataSource, request);
  }

  async findAllShelters(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Shelter>> {
    const queryBuilder = this.repository.createQueryBuilder('shelter');

    queryBuilder
      .leftJoinAndSelect('shelter.user', 'user')
      .leftJoinAndSelect('shelter.address', 'address')
      .leftJoinAndSelect('shelter.pets', 'pet');

    queryBuilder.skip((pagination.page - 1) * pagination.limit).take(pagination.limit);

    const [shelters, sheltersCount] = await Promise.all([
      queryBuilder.getMany(),
      this.repository.count(),
    ]);

    const shelterFormated = shelters.map(shelter => {
      return this.formatShelterProperties(shelter);
    });

    const counterPage = Math.ceil(sheltersCount / pagination.limit);

    return { items: shelterFormated, meta: { counterPage, totalCount: sheltersCount } };
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
