import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/IUserRepository.interface';
import { User } from 'src/entities/User.entity';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { DataSource } from 'typeorm';
import { ICreateUserUseCaseDTO } from 'src/useCases/user/createUser/dtos/ICreateUser.useCase.dto';
import { IUpdateUserUseCaseDto } from 'src/useCases/user/updateUser/dtos/IUpdateUser.useCase.dto';
import { userAssociation } from 'src/enum/userAssociation.enum';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from './BaseRepository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(UserEntity, dataSource, request);
  }

  async findById(id: string, associantion?: userAssociation): Promise<User | null> {
    const relations = associantion ? [`${associantion}`, `${associantion}.address`] : null;

    const user = await this.repository.findOne({ where: { id }, relations: relations });

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound = await this.repository.findOne({ where: { email } });

    if (!userFound) {
      return null;
    }

    const user = new User({ ...userFound });

    return user;
  }

  async verifyIfEmailIsUnique(email: string): Promise<boolean> {
    const emailIsUnique = await this.repository.findOne({ where: { email } });

    return !emailIsUnique;
  }

  async save(dataUser: ICreateUserUseCaseDTO): Promise<User> {
    const savedUser = await this.repository.save(dataUser);

    const user = new User({ ...savedUser });

    const userNew = { ...user };

    delete userNew.password;
    return userNew;
  }

  async updateUser(id: string, updateUserDto: IUpdateUserUseCaseDto): Promise<User> {
    const result = await this.repository.update({ id }, { ...updateUserDto });

    if (result.affected > 0) {
      const user = await this.repository.findOne({ where: { id } });
      return user;
    }
  }
}
