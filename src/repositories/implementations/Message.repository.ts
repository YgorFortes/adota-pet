import { Message } from 'src/entities/Message.entity';
import { IMessageRepository } from '../interfaces/IMessageRepository.interface';
import { BaseRepository } from './BaseRepository';
import { MessageEntity } from 'src/infra/db/entities/Message.entity';
import { DataSource } from 'typeorm';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export class MessageRepository extends BaseRepository<MessageEntity> implements IMessageRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(MessageEntity, dataSource, request);
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
  async findMessage(messageId: string): Promise<Message> {
    console.log(messageId);
    throw new Error('Method not implemented.');
  }

  findMessagesByGuardian(guardianId: string): Promise<Array<Message>> {
    console.log(guardianId);
    throw new Error('Method not implemented.');
  }
}
