import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository, IUpdatePetRepositoryDto } from '../interfaces/IPetRepository.interface';
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

  async findPetByShelter(petId: string, shelterId: string): Promise<Pet> {
    const queryBuilder = this.repository
      .createQueryBuilder('pet')
      .leftJoinAndSelect(`pet.shelter`, 'shelter')
      .where('pet.id = :petId', { petId })
      .andWhere('pet.shelter_id  = :shelterId', { shelterId });

    const pet = await queryBuilder.getOne();

    return pet;
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

  async updatePet(petId: string, petUpdateDto: IUpdatePetRepositoryDto): Promise<Pet> {
    const petUpdated = await this.repository.update({ id: petId }, petUpdateDto);

    if (petUpdated.affected > 0) {
      return await this.findPetById(petId);
    }
  }

  async deletePet(petId: string): Promise<boolean> {
    const petDeleted = await this.repository.delete(petId);

    if (petDeleted.affected > 0) {
      return true;
    }
  }
}
