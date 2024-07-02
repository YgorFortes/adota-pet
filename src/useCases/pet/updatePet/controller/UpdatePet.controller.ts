import {
  Body,
  Controller,
  Param,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdatePetUseCase } from '../UpdatePet.useCase';
import { FindByIdControllerDto } from 'src/common/dtos/FindById.controller.dto';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { ShelterPermition } from 'src/common/guards/ShelterPermission.guard';
import { UpdatePetControllerDto } from '../dtos/UpdatePet.controller.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidator } from 'src/common/pipes/ImageValidator.pipe';
import { Pet } from 'src/entities/Pet.entity';

@Controller('pet')
@UseGuards(AuthenticationGuard, ShelterPermition)
@UseInterceptors(FileInterceptor('image'))
export class UpdatePetController {
  constructor(private updatePetUseCase: UpdatePetUseCase) {}

  @Put(':id')
  async handle(
    @Param() params: FindByIdControllerDto,
    @Body() updatePetControllerDto: UpdatePetControllerDto,
    @Request() request: IRequestWithUser,
    @UploadedFile(new ImageValidator()) image: Express.Multer.File,
  ): Promise<Pet> {
    const userId = request.user.sub;

    const petId = params.id;

    const petUpdated = await this.updatePetUseCase.execute(petId, userId, {
      ...updatePetControllerDto,
      image,
    });

    return petUpdated;
  }
}
