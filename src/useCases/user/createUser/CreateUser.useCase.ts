import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';
import { ICreateUserUseCaseDTO } from './dtos/ICreateUser.useCase.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { Provide } from 'src/enum/provider.enum';
import { ISavePhotoInCoudInterface } from '../savePhotoInCloud/interface/ISavePhotoInCloud.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(RepositoryType.IUserRepository) private userRepository: IUserRepository,
    @Inject(Provide.ISavePhotoInCoudInterface)
    private savePhotoInCoud: ISavePhotoInCoudInterface,
  ) {}

  async execute(dtoUser: ICreateUserUseCaseDTO): Promise<User> {
    const { photo } = dtoUser;

    const userExist = await this.userRepository.findByEmail(dtoUser.email);

    if (userExist) {
      throw new BadRequestException('Usuário já existe');
    }

    const urlPhoto = await this.savePhotoInCoud.savePhoto(photo);

    const user = new User({ ...dtoUser, photo: urlPhoto });

    const userSaved = await this.userRepository.save(user);
    return userSaved;
  }
}
