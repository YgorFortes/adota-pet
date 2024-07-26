import { Pet } from 'src/entities/Pet.entity';
import { IPetRepository, IUpdatePetRepositoryDto } from '../interfaces/IPetRepository.interface';
import { BaseRepository } from './BaseRepository';
import { PetEntity } from 'src/infra/db/entities/Pet.entity';
import { DataSource } from 'typeorm';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { PetStatus } from 'src/common/enum/petStatus.enum';
import { IFilterPetsUseCaseDto } from 'src/useCases/pet/findAllPets/dto/IFilterPets.useCase.dto';
import { MessageEntity } from 'src/infra/db/entities/Message.entity';

export class PetRepository extends BaseRepository<PetEntity> implements IPetRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(PetEntity, dataSource, request);
  }

  async findPetById(petId: string, shelterId?: string): Promise<Pet> {
    const queryBuilder = this.repository
      .createQueryBuilder('pet')
      .where('pet.id = :petId', { petId })
      .andWhere('pet.status = :petStatus', { petStatus: PetStatus.NÃO_ADOTADO });

    if (shelterId) {
      queryBuilder
        .leftJoinAndSelect(`pet.shelter`, 'shelter')
        .andWhere('pet.shelter_id  = :shelterId', { shelterId });
    }

    const pet = await queryBuilder.getOne();

    return pet;
  }

  async findAllPets(filters: IFilterPetsUseCaseDto, shelterId?: string): Promise<IPagination<Pet>> {
    const queryBuilder = this.repository.createQueryBuilder('pet');

    queryBuilder.where('pet.status = :petStatus', { petStatus: PetStatus.NÃO_ADOTADO });

    if (shelterId) {
      queryBuilder.andWhere('pet.shelter_id = :shelterId', { shelterId });
    }

    if (filters.size) {
      queryBuilder.andWhere('pet.size::text ILIKE :size', { size: `%${filters.size}%` });
    }

    if (filters.specie) {
      queryBuilder.andWhere('pet.specie::text ILIKE :specie', { specie: `%${filters.specie}%` });
    }

    queryBuilder.skip((filters.page - 1) * filters.limit).take(filters.limit);

    const [pets, petsCount] = await Promise.all([queryBuilder.getMany(), queryBuilder.getCount()]);

    const counterPage = Math.ceil(petsCount / filters.limit);

    return { items: pets, meta: { counterPage, totalCount: petsCount } };
  }

  async savePet(petDto: Pet): Promise<Pet> {
    const { shelter, ...petDtoWithoutShelter } = petDto;
    const petCreated = await this.repository.save({
      ...petDtoWithoutShelter,
      shelterId: shelter.id,
    });

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
    await this.repository.manager.update(MessageEntity, { petId }, { petId: null });
    if (petDeleted.affected > 0) {
      return true;
    }
  }
}
