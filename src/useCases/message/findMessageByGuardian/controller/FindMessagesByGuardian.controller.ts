import { Controller, Get, Query, Request, UseInterceptors } from '@nestjs/common';
import { FindMessagesByGuardianUseCase } from '../FindMessagesByGuardian.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';
import { Message } from 'src/entities/Message.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('guardian')
export class FindMessagesByGuardianController {
  constructor(private findMessageByGuardianUseCase: FindMessagesByGuardianUseCase) {}
  @Get('/messages/all')
  @UseInterceptors(CacheInterceptor)
  async handle(
    @Query() pagination: FindAllPaginationControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<IPagination<Message>> {
    const userId = request.user.sub;

    const messages = await this.findMessageByGuardianUseCase.execute(pagination, userId);

    return messages;
  }
}
