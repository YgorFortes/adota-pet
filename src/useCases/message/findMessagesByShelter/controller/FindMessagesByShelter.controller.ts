import { Controller, Get, Query, Request, UseInterceptors } from '@nestjs/common';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';
import { FindMessagesByShelterUseCase } from '../FindMessagesByShelter.useCase';
import { Message } from 'src/entities/Message.entity';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('message')
export class FindMessagesByShelterController {
  constructor(private findMessageByShelterUseCase: FindMessagesByShelterUseCase) {}

  @Get('/shelter')
  @UseInterceptors(CacheInterceptor)
  async handle(
    @Query() pagination: FindAllPaginationControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<IPagination<Message>> {
    const userId = request.user.sub;
    const messages = await this.findMessageByShelterUseCase.execute(pagination, userId);

    return messages;
  }
}
