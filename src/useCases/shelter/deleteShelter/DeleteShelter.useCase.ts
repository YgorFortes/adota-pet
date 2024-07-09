import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { userAssociation } from 'src/common/enum/userAssociation.enum';
import { IShelterRepository } from 'src/repositories/interfaces/IShelterRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { LogoutUserUseCase } from 'src/useCases/user/logoutUser/LogoutUser.useCase';

@Injectable()
export class DeleteShelterUseCase {
  constructor(
    @Inject(RepositoryType.IShelterRepository) private shelterRepository: IShelterRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private logoutUserUseCase: LogoutUserUseCase,
  ) {}

  async execute(userId: string, request: IRequestWithUser): Promise<string> {
    const user = await this.findUserByIdUseCase.execute(userId, userAssociation.SHELTER);

    const shelterId = user.shelter.id;

    const result = await this.shelterRepository.deleteShelter(shelterId);

    if (!result) {
      throw new InternalServerErrorException(`Não foi possivel deletar abrigo. id: ${shelterId}`);
    }

    await this.logoutUserUseCase.execute(request);
    return `Abrigo id: ${shelterId} deletado com sucesso.`;
  }
}
