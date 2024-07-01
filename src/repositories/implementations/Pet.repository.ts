import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository } from '../interfaces/IPetRepository.interface';
import { BaseRepository } from './BaseRepository';
import { PetEntity } from 'src/infra/db/entities/Pet.entity';
import { DataSource } from 'typeorm';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { IPagination } from 'src/common/interfaces/IPagination.interface';

export class PetRepository extends BaseRepository<PetEntity> implements IPetRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(PetEntity, dataSource, request);
  }

  async findPetById(petId: string): Promise<Pet> {
    const pet = await this.repository.findOne({ where: { id: petId } });

    return pet;
  }

  async findAllPets(pagination: IFindAllPaginationUseCaseDto): Promise<IPagination<Pet>> {
    const queryBuilder = this.repository.createQueryBuilder('pet');

    queryBuilder.leftJoinAndSelect('pet.shelter', 'shelter');

    queryBuilder.skip((pagination.page - 1) * pagination.limit).take(pagination.limit);

    const [pets, petsCount] = await Promise.all([queryBuilder.getMany(), this.repository.count()]);

    const counterPage = Math.ceil(petsCount / pagination.limit);

    return { items: pets, meta: { counterPage, totalCount: petsCount } };
  }

  async savePet(petDto: Pet): Promise<Pet> {
    const petCreated = await this.repository.save(petDto);

    return petCreated;
  }
}
