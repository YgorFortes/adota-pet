import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationUserUseCase } from '../AuthenticationUser.useCase';
import { AuthenticationUserDtoController } from '../dtos/AuthenticationUser.controller.dto';

@Controller('login')
export class AuthenticationUserController {
  constructor(private readonly autheticantionUserUseCase: AuthenticationUserUseCase) {}

  @Post()
  async handle(
    @Body() authenticationDto: AuthenticationUserDtoController,
  ): Promise<{ token: string }> {
    return this.autheticantionUserUseCase.execute(authenticationDto);
  }
}
