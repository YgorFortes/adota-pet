import { Controller, Delete, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { RoleUserGuard } from 'src/common/guards/RoleUser.guard';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { DeleteShelterUseCase } from '../DeleteShelter.useCase';
import { AuthenticationGuardModule } from 'src/common/guards/authentication.module';

@Controller('shelter')
@UseGuards(AuthenticationGuardModule, RoleUserGuard)
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
