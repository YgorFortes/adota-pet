import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/IUserRepository.interface';
import { User } from 'src/entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { Repository } from 'typeorm';
import { ICreateUserUseCaseDTO } from 'src/useCases/user/createUser/dtos/ICreateUser.useCase.dto';
import { IUpdateUserUseCaseDto } from 'src/useCases/user/updateUser/dtos/IUpdateUser.useCase.dto';
import { userAssociation } from 'src/enum/userAssociation.enum';

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

  async findByEmail(email: string): Promise<User | null> {
    const userFound = await this.userRepository.findOne({ where: { email } });

    if (!userFound) {
      return null;
    }

    const user = new User({ ...userFound });

    return user;
  }

  async verifyIfEmailIsUnique(email: string): Promise<boolean> {
    const emailIsUnique = await this.userRepository.findOne({ where: { email } });

    return !emailIsUnique;
  }

  async save(dataUser: ICreateUserUseCaseDTO): Promise<User> {
    const savedUser = await this.userRepository.save(dataUser);

    const user = new User({ ...savedUser });

    const userNew = { ...user };

    delete userNew.password;
    return userNew;
  }

  async findUserWithAssociation(id: string, associantion: userAssociation): Promise<User> {
    const userGuadianAssociation = await this.userRepository.findOne({
      where: { id },
      relations: [`${associantion}`, `${associantion}.address`],
    });

    return userGuadianAssociation;
  }

  async updateUser(id: string, updateUserDto: IUpdateUserUseCaseDto): Promise<User> {
    const result = await this.userRepository.update({ id }, { ...updateUserDto });

    if (result.affected > 0) {
      const user = await this.userRepository.findOne({ where: { id } });
      return user;
    }
  }
}
