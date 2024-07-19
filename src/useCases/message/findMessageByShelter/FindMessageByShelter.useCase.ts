import { Inject } from '@nestjs/common';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Message } from 'src/entities/Message.entity';
import { IMessageRepository } from 'src/repositories/interfaces/IMessageRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';

export class FindMessageByShelterUseCase {
  constructor(
    @Inject(RepositoryType.IMessageRepository) private messageRepository: IMessageRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}
  async execute(
    pagination: IFindAllPaginationUseCaseDto,
    userId: string,
  ): Promise<IPagination<Message>> {
    const userShelter = await this.findUserByIdUseCase.execute(userId, UserRole.SHELTER);

    const shelterId = userShelter.shelter.id;

    const messages = await this.messageRepository.findMessagesByShelter(pagination, shelterId);
    return messages;
  }
}
