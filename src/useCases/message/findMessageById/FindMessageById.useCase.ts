import { Inject, NotFoundException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { Message } from 'src/entities/Message.entity';
import { IMessageRepository } from 'src/repositories/interfaces/IMessageRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';

export class FindMessageByIdUserCase {
  constructor(
    @Inject(RepositoryType.IMessageRepository) private messageRepository: IMessageRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async handle(messageId: string, userId: string): Promise<Message> {
    const shelterUser = await this.findUserByIdUseCase.execute(userId, UserRole.SHELTER);

    const shelterId = shelterUser.shelter.id;

    const message = await this.messageRepository.findMessageById(messageId, shelterId);

    if (!message) {
      throw new NotFoundException(
        `Mensagem não encontrada ou não está associada ao abrigo especificado.`,
      );
    }

    return message;
  }
}
