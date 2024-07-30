import { Inject, NotFoundException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import {
  IMessageRepository,
  IReferenceIds,
} from 'src/repositories/interfaces/IMessageRepository.interface';
import { IUpdateMessageUseCaseDto } from './dto/UpdateMessageUseCase.dto';

export class UpdateMessageUseCase {
  constructor(
    @Inject(RepositoryType.IMessageRepository) private messageRepository: IMessageRepository,
  ) {}

  async execute(
    referenceIds: IReferenceIds,
    updateMessageDto: IUpdateMessageUseCaseDto,
  ): Promise<boolean> {
    const messageUpdated = await this.messageRepository.updateMessage(
      { ...referenceIds },
      updateMessageDto,
    );

    if (!messageUpdated) {
      throw new NotFoundException('Não foi possível atualizar mensagem.');
    }

    return messageUpdated;
  }
}
