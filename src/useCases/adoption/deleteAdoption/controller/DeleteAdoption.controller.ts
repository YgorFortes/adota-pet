import { Controller, Delete, Param, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { FindByIdControllerDto } from 'src/common/dtos/FindById.controller.dto';
import { ShelterPermition } from 'src/common/guards/ShelterPermission.guard';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { DeleteAdoptionUseCase } from '../DeleteAdoption.useCase';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { AuthenticationGuardModule } from 'src/common/guards/authentication.module';

@UseGuards(AuthenticationGuardModule, ShelterPermition)
@UseInterceptors(TransactionInterceptor)
@Controller('adoption')
export class DeleteAdoptionController {
  constructor(private deleteAdoption: DeleteAdoptionUseCase) {}
  @Delete(':id')
  async handle(
    @Param() params: FindByIdControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<{ message: string }> {
    const userId = request.user.sub;
    const adoptionId = params.id;

    const result = await this.deleteAdoption.execute(userId, adoptionId);

    if (result) {
      return { message: 'Adoção deletada com sucesso.' };
    }
  }
}
