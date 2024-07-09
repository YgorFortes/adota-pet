import { Controller, Delete, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { RoleUserGuard } from 'src/common/guards/RoleUser.guard';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { DeleteGuardianUseCase } from '../DeleteGuardian.useCase';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';

@Controller('guardian')
@UseGuards(AuthenticationGuard, RoleUserGuard)
@UseInterceptors(TransactionInterceptor)
export class DeleteGuardianController {
  constructor(private deleteGuardianUseCase: DeleteGuardianUseCase) {}
  @Delete()
  async handle(@Request() request: IRequestWithUser): Promise<{ message: string }> {
    const idUser = request.user.sub;

    const result = await this.deleteGuardianUseCase.execute(idUser, request);

    if (result) {
      return { message: `Tutor deletado com sucesso.` };
    }
  }
}
