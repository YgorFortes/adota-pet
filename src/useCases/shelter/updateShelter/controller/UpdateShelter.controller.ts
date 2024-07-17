import { Body, Controller, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common';

import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { UpdateShelterUseCase } from '../UpdateShelter.useCase';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { UpdateShelterControllerDto } from '../dtos/UpdateShelter.controller.dto';
import { Shelter } from 'src/entities/Shelter.entity';
import { ImageValidator } from 'src/common/pipes/ImageValidator.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('shelter')
@UseInterceptors(FileInterceptor('user[photo]'))
@UseInterceptors(TransactionInterceptor)
export class UpdateShelterController {
  constructor(private updateShelterUseCase: UpdateShelterUseCase) {}
  @Put()
  async handle(
    @Body() updateShelterDto: UpdateShelterControllerDto,
    @Request() request: IRequestWithUser,
    @UploadedFile(new ImageValidator()) photo: Express.Multer.File,
  ): Promise<{ message: string; shelter: Shelter }> {
    const combinedData = {
      ...updateShelterDto,
      user: { ...updateShelterDto.user, photo: photo },
    };

    const userId = request.user.sub;

    const shelterUpdated = await this.updateShelterUseCase.execute(userId, { ...combinedData });

    return { message: 'Abrigo atualizado com sucesso.', shelter: shelterUpdated };
  }
}
