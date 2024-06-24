import { Body, Controller, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { UpdateGuardianControleDto } from '../dtos/UpdateGuardian.controller.dto';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { UpdateGuardianUseCase } from '../UpdateGuardian.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { RoleUserGuard } from 'src/common/guards/RoleUser.guard';
import { Guardian } from 'src/entities/Guardian.entity';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';

@UseGuards(AuthenticationGuard, RoleUserGuard)
@Controller('guardian')
@UseInterceptors(TransactionInterceptor)
export class UpdataGuardianControle {
  constructor(private updateGuardianUseCase: UpdateGuardianUseCase) {}
  @Put()
  async handle(
    @Body() updateGuardianDto: UpdateGuardianControleDto,
    @Request() request: IRequestWithUser,
  ): Promise<{ guardian: Guardian }> {
    const idUser = request.user.sub;
    const guardianUpdated = await this.updateGuardianUseCase.execute(idUser, updateGuardianDto);
    return { guardian: guardianUpdated };
  }
}
