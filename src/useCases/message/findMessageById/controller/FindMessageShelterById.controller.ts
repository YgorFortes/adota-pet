import { Controller, Get, Param, Request } from '@nestjs/common';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { Message } from 'src/entities/Message.entity';
import { FindMessageByIdUserCase } from '../FindMessageShelterById.useCase';

@Controller('shelter')
export class FindMessageShelterByIdController {
  constructor(private findMessageByIdUserCase: FindMessageByIdUserCase) {}

  @Get('message/:id')
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
