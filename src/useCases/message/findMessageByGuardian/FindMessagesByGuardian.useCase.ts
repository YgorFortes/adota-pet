import { Inject } from '@nestjs/common';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Message } from 'src/entities/Message.entity';
import { IMessageRepository } from 'src/repositories/interfaces/IMessageRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';

export class FindMessagesByGuardianUseCase {
  constructor(
    @Inject(RepositoryType.IMessageRepository) private messageRepository: IMessageRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute(
    pagination: FindAllPaginationControllerDto,
    userId: string,
  ): Promise<IPagination<Message>> {
    const guardianUser = await this.findUserByIdUseCase.execute(userId, UserRole.GUARDIAN);

    const guardianId = guardianUser.guardian.id;

    const messagesGuardian = await this.messageRepository.findMessagesByUserRole(
      pagination,
      guardianId,
      UserRole.GUARDIAN,
    );

    return messagesGuardian;
  }
}
