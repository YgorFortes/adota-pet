import { Controller, Get, Param, Request } from '@nestjs/common';
import { FindByIdControllerDto } from 'src/common/dtos/FindById.controller.dto';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { Message } from 'src/entities/Message.entity';
import { FindMessageByIdUserCase } from '../FindMessageById.useCase';

@Controller('message')
export class FindMessageByIdController {
  constructor(private findMessageByIdUserCase: FindMessageByIdUserCase) {}

  @Get(':id')
  async handle(
    @Param() params: FindByIdControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<Message> {
    const userId = request.user.sub;
    const messageId = params.id;
    const message = await this.findMessageByIdUserCase.handle(messageId, userId);
    return message;
  }
}
