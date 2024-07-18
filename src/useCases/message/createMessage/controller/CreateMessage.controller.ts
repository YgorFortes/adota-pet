import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateMessageControllerDto } from '../dtos/CreateMessage.controller.dto';
import { CreateMessageUseCase } from '../CreateMessage.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';

@Controller('message')
export class CreateMessageController {
  constructor(private createMessageUseCase: CreateMessageUseCase) {}
  @Post()
  async handle(
    @Body() createDto: CreateMessageControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<{ message: string }> {
    const userId = request.user.sub;
    const result = await this.createMessageUseCase.execute({ ...createDto, userId });

    if (result) {
      return { message: 'Mensagem enviada.' };
    }
  }
}
