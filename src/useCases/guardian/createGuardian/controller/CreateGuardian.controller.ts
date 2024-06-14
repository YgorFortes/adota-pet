import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { RoleUserGuard } from 'src/common/guards/RoleUser.guard';
import { CreateGuardianCrontollerDto } from '../dtos/CreateGuardian.controller.dto';
import { CreateGuardianUseCase } from '../CreateGuardian.userCase';
import { Guardian } from 'src/entities/Guardian.entity';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';

@Controller('guardian')
@UseGuards(AuthenticationGuard, RoleUserGuard)
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
