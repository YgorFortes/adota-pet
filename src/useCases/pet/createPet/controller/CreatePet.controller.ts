import { Body, Controller, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';

import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { CreatePetControllerDto } from '../dtos/CreatePet.controller.dto';
import { CreatePetUseCase } from '../CreatePet.useCase';
import { Pet } from 'src/entities/Pet.entity';
import { ImageValidator } from 'src/common/pipes/ImageValidator.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pet')
@UseInterceptors(FileInterceptor('photo'))
export class CreatePetController {
  constructor(private createPetUseCase: CreatePetUseCase) {}
  @Post()
  async handle(
    @Body() createPetControllerDto: CreatePetControllerDto,
    @Request() request: IRequestWithUser,
    @UploadedFile(new ImageValidator(true)) photo: Express.Multer.File,
  ): Promise<{ message: string; pet: Pet }> {
    const userId = request.user.sub;

    const petCreated = await this.createPetUseCase.execute(userId, {
      ...createPetControllerDto,
      photo,
    });

    return { message: 'Pet criado com sucesso.', pet: petCreated };
  }
}
