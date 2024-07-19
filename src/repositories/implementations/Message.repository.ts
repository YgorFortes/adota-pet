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

export class MessageRepository extends BaseRepository<MessageEntity> implements IMessageRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(MessageEntity, dataSource, request);
  }

  async findMessagesByShelter(
    pagination: IFindAllPaginationUseCaseDto,
    shelterId: string,
  ): Promise<IPagination<Message>> {
    const queryBuilder = this.repository
      .createQueryBuilder('message')
      .where('message.shelter_id = :shelterId', { shelterId });

    queryBuilder.skip((pagination.page - 1) * pagination.limit).take(pagination.limit);

    const [messages, messagesCount] = await Promise.all([
      queryBuilder.getMany(),
      queryBuilder.getCount(),
    ]);

    const counterPage = Math.ceil(messagesCount / pagination.limit);

    return { items: messages, meta: { counterPage, totalCount: messagesCount } };
  }

  findAllMessagesByPet(
    shelterId: string,
    guardianId: string,
    petId: string,
  ): Promise<Array<Message>> {
    console.log(shelterId, guardianId, petId);
    throw new Error('Method not implemented.');
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

  findMessagesByGuardian(guardianId: string): Promise<Array<Message>> {
    console.log(guardianId);
    throw new Error('Method not implemented.');
  }
}
