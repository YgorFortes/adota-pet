import { Controller, Get, Query, Request } from '@nestjs/common';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';
import { FindMessageByShelterUseCase } from '../FindMessageByShelter.useCase';
import { Message } from 'src/entities/Message.entity';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';

@Controller('message')
export class FindMessageByShelterController {
  constructor(private findMessageByShelterUseCase: FindMessageByShelterUseCase) {}

  @Get()
  async handle(
    @Query() pagination: FindAllPaginationControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<IPagination<Message>> {
    const userId = request.user.sub;
    const messages = await this.findMessageByShelterUseCase.execute(pagination, userId);

    return messages;
  }
}
