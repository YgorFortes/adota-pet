import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './BaseRepository';
import { TokenInvalidEntity } from 'src/infra/db/entities/TokenInvalid.entity';
import { ITokenInvalidRepository } from '../interfaces/ITokenInvalidRepository.interface';
import { TokenInvalid } from 'src/entities/TokenInvalid.entity';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class TokenInvalidRepository
  extends BaseRepository<TokenInvalidEntity>
  implements ITokenInvalidRepository
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(TokenInvalidEntity, dataSource, request);
  }

  async findAll(): Promise<Array<TokenInvalid>> {
    const tokensInvalids = await this.repository.find();

    return tokensInvalids;
  }
  async saveTokenInvalid(token: TokenInvalid): Promise<void> {
    await this.repository.save(token);
  }
  async deleteAllTokensInvalids(): Promise<boolean> {
    try {
      const queryBuild = this.repository.createQueryBuilder('token_invalid');

      queryBuild.delete().from(TokenInvalidEntity).execute();

      return true;
    } catch (error) {
      return false;
    }
  }
}
