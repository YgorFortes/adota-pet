/* eslint-disable @typescript-eslint/no-unused-vars */
import { Guardian } from 'src/entities/Guardian.entity';
import {
  IGuardianRepository,
  IUpdateGuardianRepositoryDto,
} from '../interfaces/IGuardianRepository.interface';
import { GuardianEntity } from 'src/infra/db/entities/Guardian.entity';

import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { IUpdateGuardianUseCaseDto } from 'src/useCases/guardian/updateGuardian/dtos/IUpdateGuardian.useCase.dto';
import { IPagination } from 'src/common/interfaces/IPagination.interface';

import { BaseRepository } from './BaseRepository';

import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class GuardianRepository
  extends BaseRepository<GuardianEntity>
  implements IGuardianRepository
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(GuardianEntity, dataSource, request);
  }

  async findAllGuardians(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Guardian>> {
    const queryBuilder = this.repository.createQueryBuilder('guardian');

    queryBuilder
      .leftJoinAndSelect('guardian.user', 'user')
      .leftJoinAndSelect('guardian.address', 'address')
      .leftJoinAndSelect('guardian.pets', 'pet');

    queryBuilder.skip((pagination.page - 1) * pagination.limit).take(pagination.limit);

    const [guadians, guardiansCount] = await Promise.all([
      queryBuilder.getMany(),
      this.repository.count(),
    ]);

    const guardiansFormatted = guadians.map(guardian => {
      return this.formatGuardianProperties(guardian);
    });

    const counterPage = Math.ceil(guardiansCount / pagination.limit);

    return { items: guardiansFormatted, meta: { counterPage, totalCount: guardiansCount } };
  }

  async findGuardianById(id: string): Promise<Guardian> {
    const guardian = await this.repository.findOne({
      where: { id },
      relations: ['user', 'address'],
    });

    if (!guardian) {
      return null;
    }

    const guardiansFormatted = this.formatGuardianProperties(guardian);

    return guardiansFormatted;
  }

  async save(dataGuardian: Guardian): Promise<Guardian> {
    const guardianCreated = await this.repository.save(dataGuardian);

    const guardiansFormatted = this.formatGuardianProperties(guardianCreated);
    return guardiansFormatted;
  }

  async updateGuardian(
    id: string,
    updateGuardianDto: IUpdateGuardianRepositoryDto,
  ): Promise<Guardian> {
    const result = await this.repository.update({ id }, { ...updateGuardianDto });

    if (result.affected > 0) {
      return this.findGuardianById(id);
    }
  }

  async deleteGuardian(id: string): Promise<boolean> {
    const guardian = await this.repository.findOne({
      where: { id },
      relations: ['user', 'address'],
    });

    await this.repository.manager.remove(guardian.address);
    await this.repository.manager.remove(guardian.user);
    await this.repository.manager.remove(guardian);

    const guadianDeleted = await this.findGuardianById(id);

    return !guadianDeleted;
  }

  // To do called GuardianEntity  when guardian Message receveid Message
  private formatGuardianProperties(guardian: GuardianEntity): Guardian {
    if (!guardian) {
      return null;
    }

    const { id, user, about, birthDate, address, pets, createdAt, updatedAt, deletedAt } = guardian;
    delete user.password;

    const guardianWithPet = {
      id,
      user,
      about,
      birthDate,
      address,
      pets,
      createdAt,
      updatedAt,
      deletedAt,
    };

    return guardianWithPet;
  }
}
