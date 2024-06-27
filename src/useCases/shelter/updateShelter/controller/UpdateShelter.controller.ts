import {
  Body,
  Controller,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { RoleUserGuard } from 'src/common/guards/RoleUser.guard';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { UpdateShelterUseCase } from '../UpdateShelter.useCase';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { UpdateShelterControllerDto } from '../dtos/UpdateShelter.controller.dto';
import { Shelter } from 'src/entities/Shelter.entity';
import { ImageValidator } from 'src/common/pipes/ImageValidator.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('shelter')
@UseGuards(AuthenticationGuard, RoleUserGuard)
@UseInterceptors(FileInterceptor('user.photo'))
@UseInterceptors(TransactionInterceptor)
export class UpdateShelterController {
  constructor(private updateShelterUseCase: UpdateShelterUseCase) {}
  @Put()
  async handle(
    @Body() updateShelterDto: UpdateShelterControllerDto,
    @Request() request: IRequestWithUser,
    @UploadedFile(new ImageValidator()) photo: Express.Multer.File,
  ): Promise<{ shelter: Shelter }> {
    const combinedData = {
      ...updateShelterDto,
      user: { photo: photo },
    };

    const userId = request.user.sub;

    const shelterUpdated = await this.updateShelterUseCase.execute(userId, { ...combinedData });

    return { shelter: shelterUpdated };
  }
}
