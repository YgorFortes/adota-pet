import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';
import { IUpdateUserUseCaseDto } from './dtos/IUpdateUser.useCase.dto';
import { FindUserByIdUseCase } from '../findUserById/FindUserById.useCase';
import { User } from 'src/entities/User.entity';
import { HashPasswordPipe } from 'src/common/pipes/HashPassword.pipe';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(RepositoryType.IUserRepository) private userRepository: IUserRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private hashPassWordPipe: HashPasswordPipe,
  ) {}

  async execute(id: string, updateUserDto: IUpdateUserUseCaseDto): Promise<Omit<User, 'password'>> {
    await this.findUserByIdUseCase.execute(id);

    if (updateUserDto.email) {
      await this.verifyEmailIsUnique(updateUserDto.email);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.updatePassword(updateUserDto.password);
    }

    const { email, name, photo, telephone } = updateUserDto;

    const userUpdated = await this.userRepository.updateUser(id, {
      email,
      name,
      password: updateUserDto.password,
      photo,
      telephone,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = userUpdated;

    return userWithoutPassword;
  }

  private async updatePassword(passwordTyped: string): Promise<string> {
    const passwordHashed = await this.hashPassWordPipe.transform(passwordTyped);

    return passwordHashed;
  }

  private async verifyEmailIsUnique(email: string): Promise<void> {
    const emailIsUnique = await this.userRepository.verifyIfEmailIsUnique(email);

    if (!emailIsUnique) {
      throw new NotFoundException('Este email já está em uso.');
    }
  }
}