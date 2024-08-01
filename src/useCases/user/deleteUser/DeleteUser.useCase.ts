import { Inject, InternalServerErrorException } from '@nestjs/common';
import { Provide } from 'src/common/enum/provider.enum';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IUserWithAssociation } from 'src/common/interfaces/IUserWithAssociation';
import { IUserRepository } from 'src/repositories/interfaces/IUserRepository.interface';
import { IManagePhotoInCloudInterface } from 'src/useCases/common/ManagePhotoInCloud/interface/ISavePhotoInCloud.interface';

export class DeleteUserUseCase {
  constructor(@Inject(RepositoryType.IUserRepository) private userRepository: IUserRepository) {}

  async execute(user: IUserWithAssociation): Promise<boolean> {
    const result = await this.userRepository.deleteUser(user.id);

    if (!result) {
      throw new InternalServerErrorException('Não foi possível deletar usuário.');
    }

    return true;
  }
}
