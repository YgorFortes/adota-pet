import { Controller, Get, Param, Request, UseInterceptors } from '@nestjs/common';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { Message } from 'src/entities/Message.entity';
import { FindMessageByIdUserCase } from '../FindMessageShelterById.useCase';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('shelter')
export class FindMessageShelterByIdController {
  constructor(private findMessageByIdUserCase: FindMessageByIdUserCase) {}

  @Get('message/:id')
  @UseInterceptors(CacheInterceptor)
  async handle(
    @Param() params: IdParamControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<Message> {
    const userId = request.user.sub;
    const messageId = params.id;
    const message = await this.findMessageByIdUserCase.handle(messageId, userId);
    return message;
  }
}
