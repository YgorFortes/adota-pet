import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/IUserRepository.interface';
import { User } from 'src/entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { Repository } from 'typeorm';
import { ICreateUserDTO } from 'src/useCases/user/createUser/dtos/ICreateUser.useCase.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    return user;
  }

  async save(dataUser: ICreateUserDTO): Promise<User> {
    const savedUser = await this.userRepository.save(dataUser);

    const user = new User({ ...savedUser });

    const userNew = { ...user };

    delete userNew.password;
    return userNew;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound = await this.userRepository.findOne({ where: { email } });

    if (!userFound) {
      return null;
    }

    const user = new User({ ...userFound });

    return user;
  }
}
