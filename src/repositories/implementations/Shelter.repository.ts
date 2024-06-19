import { Injectable } from '@nestjs/common';
import { IShelterRepository } from '../interfaces/IShelterRepository.interface';
import { Shelter } from 'src/entities/Shelter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ShelterEntity } from 'src/infra/db/entities/Shelter.entity';

@Injectable()
export class ShelterRepository implements IShelterRepository {
  constructor(
    @InjectRepository(ShelterEntity)
    private readonly shelterRepository: Repository<ShelterEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  save(shelterdto: Shelter, transactionalEntityManager?: EntityManager): Promise<Shelter> {
    const entityManager = transactionalEntityManager || this.entityManager;
    return entityManager.transaction(async transEntityManager => {
      const shelterEntity = transEntityManager.create(ShelterEntity, {
        about: shelterdto.about,
        webSite: shelterdto.webSite,
        workingHours: shelterdto.workingHours,
        address: shelterdto.address,
        user: shelterdto.user,
      });

      const shelterCreated = await transEntityManager.save(shelterEntity);

      const shelterFormated = this.formatShelterProperties(shelterCreated);
      return shelterFormated;
    });
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
