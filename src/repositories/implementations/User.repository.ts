import { Inject, Injectable } from '@nestjs/common';
import { IUpdateUserRepositoryDto, IUserRepository } from '../interfaces/IUserRepository.interface';
import { User } from 'src/entities/User.entity';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from './BaseRepository';
import { UserRole } from 'src/common/enum/roleUser.enum';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(UserEntity, dataSource, request);
  }

  async findById(id: string, associantion?: UserRole): Promise<User | null> {
    const queryBuilder = this.repository.createQueryBuilder('user');
    queryBuilder.where('user.id = :id', { id });

    if (associantion) {
      queryBuilder.leftJoinAndSelect(`user.${associantion}`, associantion);
      queryBuilder.leftJoinAndSelect(`${associantion}.address`, 'address');
    }

    const user = await queryBuilder.getOne();

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const userFound = await this.repository.findOne({ where: { email } });

    if (!userFound) {
      return null;
    }

    return userFound;
  }

  async verifyIfEmailIsUnique(email: string): Promise<boolean> {
    const emailIsUnique = await this.repository.findOne({ where: { email } });

    return !emailIsUnique;
  }

  async save(dataUser: User): Promise<User> {
    const savedUser = await this.repository.save(dataUser);

    const user = new User({ ...savedUser });

    const userNew = { ...user };

    delete userNew.password;
    return userNew;
  }

  async updateUser(id: string, updateUserDto: IUpdateUserRepositoryDto): Promise<User> {
    const result = await this.repository.update({ id }, { ...updateUserDto });

    if (result.affected > 0) {
      const user = await this.repository.findOne({ where: { id } });
      return user;
    }
  }
}
