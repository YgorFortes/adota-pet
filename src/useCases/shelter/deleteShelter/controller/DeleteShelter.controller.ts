import { Controller, Delete, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { RoleUserGuard } from 'src/common/guards/RoleUser.guard';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { DeleteShelterUseCase } from '../DeleteShelter.useCase';

@Controller('shelter')
@UseGuards(AuthenticationGuard, RoleUserGuard)
@UseInterceptors(TransactionInterceptor)
export class DeleteShelterController {
  constructor(private deleteShelterUseCase: DeleteShelterUseCase) {}
  @Delete()
  async handle(@Request() request: IRequestWithUser): Promise<{ message: string }> {
    const userId = request.user.sub;

    const result = await this.deleteShelterUseCase.execute(userId, request);

    if (result) {
      return { message: `Abrigo deletado com sucesso.` };
    }
  }
}
