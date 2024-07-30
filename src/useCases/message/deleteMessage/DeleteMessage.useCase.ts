import { Inject, NotFoundException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IMessageRepository } from 'src/repositories/interfaces/IMessageRepository.interface';

export class DeleteMessageUseCase {
  constructor(
    @Inject(RepositoryType.IMessageRepository) private messageRepository: IMessageRepository,
  ) {}

  async execute(messageId: string): Promise<boolean> {
    const result = await this.messageRepository.softDeleteMessage(messageId);

    if (!result) {
      throw new NotFoundException('Não foi possível deletar mensagem.');
    }

    return result;
  }
}
