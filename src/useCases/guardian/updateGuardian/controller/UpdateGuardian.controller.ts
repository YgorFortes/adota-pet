import {
  Body,
  Controller,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateGuardianControleDto } from '../dtos/UpdateGuardian.controller.dto';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { UpdateGuardianUseCase } from '../UpdateGuardian.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { RoleUserGuard } from 'src/common/guards/RoleUser.guard';
import { Guardian } from 'src/entities/Guardian.entity';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { ImageValidator } from 'src/common/pipes/ImageValidator.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthenticationGuard, RoleUserGuard)
@Controller('guardian')
@UseInterceptors(TransactionInterceptor)
@UseInterceptors(FileInterceptor('user.photo'))
export class UpdataGuardianControle {
  constructor(private updateGuardianUseCase: UpdateGuardianUseCase) {}
  @Put()
  async handle(
    @Body() updateGuardianDto: UpdateGuardianControleDto,
    @Request() request: IRequestWithUser,
    @UploadedFile(new ImageValidator()) photo: Express.Multer.File,
  ): Promise<{ guardian: Guardian }> {
    const combinedData = {
      ...updateGuardianDto,
      user: { photo: photo },
    };

    const idUser = request.user.sub;
    const guardianUpdated = await this.updateGuardianUseCase.execute(idUser, combinedData);
    return { guardian: guardianUpdated };
  }
}
