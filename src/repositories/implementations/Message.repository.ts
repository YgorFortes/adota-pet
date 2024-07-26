import { Message } from 'src/entities/Message.entity';
import { IMessageRepository } from '../interfaces/IMessageRepository.interface';
import { BaseRepository } from './BaseRepository';
import { MessageEntity } from 'src/infra/db/entities/Message.entity';
import { DataSource } from 'typeorm';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { IFindAllPaginationUseCaseDto } from 'src/common/dtos/IFindAllPagination.useCase.dto';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { UserRole } from 'src/common/enum/roleUser.enum';

export class MessageRepository extends BaseRepository<MessageEntity> implements IMessageRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(MessageEntity, dataSource, request);
  }

  async findMessagesByUserRole(
    pagination: IFindAllPaginationUseCaseDto,
    userRoleId: string,
    userRole: UserRole,
  ): Promise<IPagination<Message>> {
    const queryBuilder = this.repository.createQueryBuilder('message');

    if (userRole === UserRole.SHELTER) {
      queryBuilder.where('message.shelter_id = :shelterId', { shelterId: userRoleId });
    }

    if (userRole === UserRole.GUARDIAN) {
      queryBuilder.where('message.guardian_id = :guardianId', { guardianId: userRoleId });
    }

    queryBuilder.skip((pagination.page - 1) * pagination.limit).take(pagination.limit);

    const [messages, messagesCount] = await Promise.all([
      queryBuilder.getMany(),
      queryBuilder.getCount(),
    ]);

    const counterPage = Math.ceil(messagesCount / pagination.limit);

    return { items: messages, meta: { counterPage, totalCount: messagesCount } };
  }

  async saveMessage(message: Message): Promise<Message> {
    const messageCreated = await this.repository.save(message);

    return messageCreated;
  }
  async findMessageById(messageId: string, shelterId: string): Promise<Message> {
    const message = await this.repository.findOne({
      where: { id: messageId, shelter: { id: shelterId } },
    });

    return message;
  }
}
