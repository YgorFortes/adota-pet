import { Inject, Injectable, Scope } from '@nestjs/common';
import {
  IShelterRepository,
  IUpdateShelterRepositoryDto,
} from '../interfaces/IShelterRepository.interface';
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

  async findShelterById(shelterId: string): Promise<Shelter> {
    const shelter = await this.repository.findOne({
      where: { id: shelterId },
      relations: ['user', 'address'],
    });

    if (!shelter) {
      return null;
    }

    const shelterFormated = this.formatShelterProperties(shelter);

    return shelterFormated;
  }

  async findAllShelters(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Shelter>> {
    const queryBuilder = this.repository.createQueryBuilder('shelter');

    queryBuilder
      .leftJoinAndSelect('shelter.user', 'user')
      .leftJoinAndSelect('shelter.address', 'address');

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

  async updateShelter(
    shelterId: string,
    updateShelterDto: IUpdateShelterRepositoryDto,
  ): Promise<Shelter> {
    const result = await this.repository.update({ id: shelterId }, { ...updateShelterDto });

    if (result.affected > 0) {
      const shelter = await this.repository.findOne({ where: { id: shelterId } });
      return shelter;
    }
  }

  async deleteShelter(shelterId: string): Promise<boolean> {
    const shelter = await this.repository.findOne({
      where: { id: shelterId },
      relations: ['user', 'address'],
    });

    await this.repository.manager.remove(shelter.user);
    await this.repository.manager.remove(shelter);

    const shelterDeleted = await this.repository.findOne({ where: { id: shelterId } });

    return !shelterDeleted;
  }

  private formatShelterProperties(shelter: ShelterEntity): Shelter {
    if (!shelter) {
      return null;
    }

    const {
      id,
      user,
      about,
      webSite,
      address,
      workingHours,
      createdAt,
      updatedAt,
      deletedAt,
      pets,
    } = shelter;

    delete user.shelter;

    const shelterFormated = {
      id,
      user,
      about,
      webSite,
      workingHours,
      address,
      pets,
      createdAt,
      updatedAt,
      deletedAt,
    };

    return shelterFormated;
  }
}
