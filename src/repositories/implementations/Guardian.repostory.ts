/* eslint-disable @typescript-eslint/no-unused-vars */
import { Guardian } from 'src/entities/Guardian.entity';
import { IGuardianRepository } from '../interfaces/IGuardianRepository.interface';
import { GuardianEntity } from 'src/infra/db/entities/Guardian.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IFindAllGuardiansUseCaseDto } from 'src/useCases/guardian/findAllGuardians/dtos/IFindAllGuardins.useCase.dto';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { IUpdateGuardianUseCaseDto } from 'src/useCases/guardian/updateGuardian/dtos/IUpdateGuardian.useCase.dto';

@Injectable()
export class GuardianRepository implements IGuardianRepository {
  constructor(
    @InjectRepository(GuardianEntity)
    private readonly guardianRepository: Repository<GuardianEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async findAllGuardians(pagination: IFindAllGuardiansUseCaseDto): Promise<IPagination<Guardian>> {
    const queryBuilder = this.guardianRepository.createQueryBuilder('guardian');

    queryBuilder
      .leftJoinAndSelect('guardian.user', 'user')
      .leftJoinAndSelect('guardian.address', 'address')
      .leftJoinAndSelect('guardian.pets', 'pet');

    queryBuilder.skip((pagination.page - 1) * pagination.limit).take(pagination.limit);

    const [guadians, guardiansCount] = await Promise.all([
      queryBuilder.getMany(),
      this.guardianRepository.count(),
    ]);

    const guardiansFormatted = guadians.map(guardian => {
      return this.formatGuardianProperties(guardian);
    });

    const counterPage = Math.ceil(guardiansCount / pagination.limit);

    return { items: guardiansFormatted, meta: { counterPage, totalCount: guardiansCount } };
  }

  async findGuardianById(id: string): Promise<Guardian> {
    const guardian = await this.guardianRepository.findOne({
      where: { id },
      relations: ['user', 'address'],
    });

    if (!guardian) {
      return null;
    }

    const guardiansFormatted = this.formatGuardianProperties(guardian);

    return guardiansFormatted;
  }

  async save(
    dataGuardian: Guardian,
    transactionalEntityManager?: EntityManager,
  ): Promise<Guardian> {
    const entityManager = transactionalEntityManager || this.entityManager;
    return entityManager.transaction(async transEntityManager => {
      const guardianEntity = transEntityManager.create(GuardianEntity, {
        about: dataGuardian.about,
        birthDate: dataGuardian.birthDate,
        address: dataGuardian.address,
        user: dataGuardian.user,
      });

      const guardianCreated = await transEntityManager.save(guardianEntity);

      const guardiansFormatted = this.formatGuardianProperties(guardianCreated);
      return guardiansFormatted;
    });
  }

  async updateGuardian(
    id: string,
    updateGuardianDto: IUpdateGuardianUseCaseDto,
  ): Promise<Guardian> {
    const result = await this.guardianRepository.update({ id }, { ...updateGuardianDto });

    if (result.affected > 0) {
      return this.findGuardianById(id);
    }
  }

  async deleteGuardian(id: string, transactionalEntityManager?: EntityManager): Promise<boolean> {
    const entityManager = transactionalEntityManager || this.entityManager;

    const guardian = await this.guardianRepository.findOne({
      where: { id },
      relations: ['user', 'address'],
    });

    await entityManager.transaction(async transEntityManager => {
      const promiseRemoveAdrress = transEntityManager.remove(guardian.address);

      const promiseRemoveUser = transEntityManager.remove(guardian.user);

      const promiseRemoveGuardian = transEntityManager.remove(guardian);

      const [__] = await Promise.all([
        promiseRemoveAdrress,
        promiseRemoveUser,
        promiseRemoveGuardian,
      ]);
    });

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
