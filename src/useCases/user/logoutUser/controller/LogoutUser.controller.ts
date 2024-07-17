import { Controller, Get, Request } from '@nestjs/common';
import { LogoutUserUseCase } from '../LogoutUser.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { extractTokenHeader } from 'src/common/helpers/extractToken.helpers';

@Controller('logout')
export class LogoutUserController {
  constructor(private logoutUserUseCase: LogoutUserUseCase) {}

  @Get()
  async handle(@Request() request: IRequestWithUser): Promise<{ message: string }> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = extractTokenHeader(request);
    const result = await this.logoutUserUseCase.execute(token);

    if (result) {
      return { message: 'Usuário deslogado com sucesso.' };
    }
  }
}
