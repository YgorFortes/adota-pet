/* eslint-disable @typescript-eslint/no-unused-vars */
import { Guardian } from 'src/entities/Guardian.entity';
import { IGuardianRepository } from '../interfaces/IGuardianRepository.interface';
import { GuardianEntity } from 'src/infra/db/entities/Guardian.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ICreateGuardianUseCaseDto } from 'src/useCases/guardian/createGuardian/dtos/ICreateGuardian.UseCase.dto';

@Injectable()
export class GuardianRepository implements IGuardianRepository {
  constructor(
    @InjectRepository(GuardianEntity)
    private readonly guardianRepository: Repository<GuardianEntity>,
    private readonly entityManager: EntityManager,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(
    dataGuardian: Guardian,
    transactionalEntityManager?: EntityManager,
  ): Promise<Guardian> {
    const { about, birthDate, address, user } = dataGuardian;

    const entityManager = transactionalEntityManager || this.entityManager;
    return entityManager.transaction(async transEntityManager => {
      const guardianEntity = transEntityManager.create(GuardianEntity, {
        about: dataGuardian.about,
        birthDate: dataGuardian.birthDate,
        address: dataGuardian.address,
        user: dataGuardian.user,
      });

      const guardianCreated = await transEntityManager.save(guardianEntity);

      const { id, about, birthDate, createdAt, updatedAt, deletedAt, address, user } =
        guardianCreated;

      return { id, user, about, birthDate, address, createdAt, updatedAt, deletedAt };
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByEmail(email: string): Promise<Guardian> {
    throw new Error('Method not implemented.');
  }
}
