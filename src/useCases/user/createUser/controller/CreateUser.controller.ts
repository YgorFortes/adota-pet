import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateUserControllerDto } from '../dtos/CreateUser.controller.dto';
import { CreateUserUseCase } from '../CreateUser.useCase';
import { HashPasswordPipe } from 'src/common/pipes/HashPassword.pipe';
import { User } from 'src/entities/User.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidator } from 'src/common/pipes/ImageValidator.pipe';

@Controller('user')
@UseInterceptors(FileInterceptor('photo'))
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async handle(
    @Body() userDto: CreateUserControllerDto,
    @Body('password', HashPasswordPipe) hashedPassword: string,
    @UploadedFile(new ImageValidator(true)) photo: Express.Multer.File,
  ): Promise<{ message: string; user: User }> {
    const userSaved = await this.createUserUseCase.execute({
      ...userDto,
      password: hashedPassword,
      photo,
    });

    return { message: 'Usuário criado', user: userSaved };
  }
}
