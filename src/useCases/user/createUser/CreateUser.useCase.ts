import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';
import { ICreateUserUseCaseDTO } from './dtos/ICreateUser.useCase.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { Provide } from 'src/common/enum/provider.enum';
import { IPayLoad } from 'src/common/interfaces/IPayLoad.interface';
import { JwtService } from '@nestjs/jwt';
import { IManagePhotoInCloudInterface } from 'src/useCases/common/ManagePhotoInCloud/interface/ISavePhotoInCloud.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(RepositoryType.IUserRepository) private userRepository: IUserRepository,
    @Inject(Provide.IManagePhotoInCloudInterface)
    private managePhotoInCloud: IManagePhotoInCloudInterface,
    private readonly jtwService: JwtService,
  ) {}

  async execute(dtoUser: ICreateUserUseCaseDTO): Promise<{ user: User; token: string }> {
    const { photo } = dtoUser;

    const userExist = await this.userRepository.findByEmail(dtoUser.email);

    if (userExist) {
      throw new BadRequestException('Usuário já existe');
    }

    const urlPhoto = await this.managePhotoInCloud.uploadPhoto(photo);

    const user = new User({ ...dtoUser, photo: urlPhoto });

    const userSaved = await this.userRepository.save(user);

    const payload: IPayLoad = {
      sub: userSaved.id,
      nameUser: userSaved.name,
    };

    return { user: userSaved, token: await this.jtwService.signAsync(payload) };
  }
}
