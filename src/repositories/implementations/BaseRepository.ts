import { Request } from 'express';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ENTITY_MANAGER_KEY } from '../../resource/interceptor/transaction.interceptor';

export class BaseRepository<Entity> {
  private _repository: Repository<Entity>;
  constructor(
    private entityCls: new () => Entity,
    private dataSource: DataSource,
    private request: Request,
  ) {
    this._repository = this.dataSource.getRepository(this.entityCls);
  }

  protected get repository(): Repository<Entity> {
    const entityManager: EntityManager =
      this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
    return entityManager.getRepository(this.entityCls);
  }
}
