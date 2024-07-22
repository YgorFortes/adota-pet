import { Controller, Get, Query, Request } from '@nestjs/common';
import { FindMessagesByGuardianUseCase } from '../FindMessagesByGuardian.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';
import { Message } from 'src/entities/Message.entity';

@Controller('message')
export class FindMessagesByGuardianController {
  constructor(private findMessageByGuardianUseCase: FindMessagesByGuardianUseCase) {}
  @Get('/guardian')
  async handle(
    @Query() pagination: FindAllPaginationControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<IPagination<Message>> {
    const userId = request.user.sub;

    const messages = await this.findMessageByGuardianUseCase.execute(pagination, userId);

    return messages;
  }
}
