import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateMessageControllerDto } from '../dtos/CreateMessage.controller.dto';
import { CreateMessageUseCase } from '../CreateMessage.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { UserRole } from 'src/common/enum/roleUser.enum';

@Controller('shelter')
export class CreateShelterMessageController {
  constructor(private createMessageUseCase: CreateMessageUseCase) {}
  @Post('message')
  async handle(
    @Body() createMessageDto: CreateMessageControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<{ message: string }> {
    const userId = request.user.sub;
    const result = await this.createMessageUseCase.execute(
      { ...createMessageDto, role: UserRole.SHELTER },
      userId,
    );

    if (result) {
      return { message: 'Mensagem enviada.' };
    }
  }
}
