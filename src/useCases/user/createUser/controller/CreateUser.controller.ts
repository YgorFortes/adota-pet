import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserControllerDto } from '../dtos/CreateUser.controller.dto';
import { CreateUserUseCase } from '../CreateUser.useCase';
import { HashPasswordPipe } from 'src/common/pipes/HashPassword.pipe';
import { User } from 'src/entities/User.entity';

@Controller('user')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async handle(
    @Body() userDto: CreateUserControllerDto,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ): Promise<{ message: string; user: User }> {
    const userSaved = await this.createUserUseCase.execute({
      ...userDto,
      password: hashedPassword,
    });

    return { message: 'Usuário criado', user: userSaved };
  }
}
