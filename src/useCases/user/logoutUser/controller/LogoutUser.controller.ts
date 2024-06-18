import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { LogoutUserUseCase } from '../LogoutUser.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';

@Controller('logout')
@UseGuards(AuthenticationGuard)
export class LogoutUserController {
  constructor(private logoutUserUseCase: LogoutUserUseCase) {}

  @Get()
  async handle(@Request() request: IRequestWithUser): Promise<{ message: string }> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await this.logoutUserUseCase.execute(request);

    if (result) {
      return { message: 'Usuário deslogado com sucesso.' };
    }
  }
}
