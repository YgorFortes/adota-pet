import { Body, Controller, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UpdateGuardianControleDto } from '../dtos/UpdateGuardian.controller.dto';
import { UpdateGuardianUseCase } from '../UpdateGuardian.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { Guardian } from 'src/entities/Guardian.entity';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { ImageValidator } from 'src/common/pipes/ImageValidator.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('guardian')
@UseInterceptors(TransactionInterceptor)
@UseInterceptors(FileInterceptor('user[photo]'))
export class UpdataGuardianControle {
  constructor(private updateGuardianUseCase: UpdateGuardianUseCase) {}
  @Put()
  async handle(
    @Body() updateGuardianDto: UpdateGuardianControleDto,
    @Request() request: IRequestWithUser,
    @UploadedFile(new ImageValidator()) photo: Express.Multer.File,
  ): Promise<{ message: string; guardian: Guardian }> {
    const combinedData = {
      ...updateGuardianDto,
      ...(photo ? { user: { ...updateGuardianDto.user, photo } } : {}),
    };

    const idUser = request.user.sub;
    const guardianUpdated = await this.updateGuardianUseCase.execute(idUser, combinedData);
    return { message: 'Tutor atualizado com sucesso.', guardian: guardianUpdated };
  }
}
