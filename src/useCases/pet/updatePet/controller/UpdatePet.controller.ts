import {
  Body,
  Controller,
  Param,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UpdatePetUseCase } from '../UpdatePet.useCase';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { UpdatePetControllerDto } from '../dtos/UpdatePet.controller.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidator } from 'src/common/pipes/ImageValidator.pipe';
import { Pet } from 'src/entities/Pet.entity';

@Controller('pet')
@UseInterceptors(FileInterceptor('photo'))
export class UpdatePetController {
  constructor(private updatePetUseCase: UpdatePetUseCase) {}

  @Put(':id')
  async handle(
    @Param() params: IdParamControllerDto,
    @Body() updatePetControllerDto: UpdatePetControllerDto,
    @Request() request: IRequestWithUser,
    @UploadedFile(new ImageValidator()) photo: Express.Multer.File,
  ): Promise<{ message: string; pet: Pet }> {
    const userId = request.user.sub;

    const petId = params.id;

    const petUpdated = await this.updatePetUseCase.execute(petId, userId, {
      ...updatePetControllerDto,
      photo,
    });

    return { message: 'Pet atualizado com sucesso', pet: petUpdated };
  }
}
