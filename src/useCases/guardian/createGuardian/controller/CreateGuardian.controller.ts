import { Body, Controller, Post, Request, UseInterceptors } from '@nestjs/common';
import { CreateGuardianCrontollerDto } from '../dtos/CreateGuardian.controller.dto';
import { CreateGuardianUseCase } from '../CreateGuardian.userCase';
import { Guardian } from 'src/entities/Guardian.entity';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';

@Controller('guardian')
@UseInterceptors(TransactionInterceptor)
export class CreateGuadianController {
  constructor(private createGuardianUseCase: CreateGuardianUseCase) {}
  @Post()
  async handle(
    @Body() guardianDto: CreateGuardianCrontollerDto,
    @Request() request: IRequestWithUser,
  ): Promise<{ message: string; guardian: Guardian }> {
    const idUser = request.user.sub;

    const guardian = await this.createGuardianUseCase.execute({ idUser: idUser, ...guardianDto });

    return { message: 'Tutor criado com sucesso.', guardian: guardian };
  }
}
