import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';
import { ICreateUserUseCaseDTO } from './dtos/ICreateUser.useCase.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { Provide } from 'src/common/enum/provider.enum';
import { IPayLoad } from 'src/common/interfaces/IPayLoad.interface';
import { JwtService } from '@nestjs/jwt';
import { IManagePhotoInCloudInterface } from 'src/useCases/common/ManagePhotoInCloud/interface/ISavePhotoInCloud.interface';
import { CreateAddressUseCase } from 'src/useCases/address/createAddress/CreateAddress.useCase';
import { CreateGuardianUseCase } from 'src/useCases/guardian/createGuardian/CreateGuardian.userCase';
import { CreateShelterUseCase } from 'src/useCases/shelter/createShelter/CreateShelter.useCase';
import { UserRole } from 'src/common/enum/roleUser.enum';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(RepositoryType.IUserRepository) private userRepository: IUserRepository,
    private createAddressUseCase: CreateAddressUseCase,
    private createGuardianUseCase: CreateGuardianUseCase,
    private createShelterUseCase: CreateShelterUseCase,
    @Inject(Provide.IManagePhotoInCloudInterface)
    private managePhotoInCloud: IManagePhotoInCloudInterface,
    private readonly jtwService: JwtService,
  ) {}

  async execute(dtoUser: ICreateUserUseCaseDTO): Promise<{ user: User; token: string }> {
    const { photo, guardian, shelter, address } = dtoUser;

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

    const addressCreated = await this.createAddressUseCase.execute(address);

    if (guardian && userSaved.role === UserRole.GUARDIAN) {
      await this.createGuardianUseCase.execute(guardian, userSaved, addressCreated);
    }

    if (shelter && userSaved.role === UserRole.SHELTER) {
      await this.createShelterUseCase.execute(shelter, userSaved, addressCreated);
    }

    return { user: userSaved, token: await this.jtwService.signAsync(payload) };
  }
}
