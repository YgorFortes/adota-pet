import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationGuard, RequestWithUser } from 'src/common/guards/Authentication.guard';
import { RoleUserGuard } from 'src/common/guards/RoleUser.guard';
import { GuardianCrontollerDto } from '../dtos/CreateGuardian.controller.dto';
import { CreateGuardianUseCase } from '../CreateGuardian.userCase';
import { Guardian } from 'src/entities/Guardian.entity';

@Controller('guardian')
@UseGuards(AuthenticationGuard, RoleUserGuard)
export class CreateGuadianController {
  constructor(private createGuardianUseCase: CreateGuardianUseCase) {}
  @Post()
  async handle(
    @Body() guardianDto: GuardianCrontollerDto,
    @Request() request: RequestWithUser,
  ): Promise<{ message: string; guardian: Guardian }> {
    const idUser = request.user.sub;

    const guardian = await this.createGuardianUseCase.execute({ idUser: idUser, ...guardianDto });

    return { message: 'Tutor criado com sucesso.', guardian: guardian };
  }
}