import { Controller, Delete, Param, Request, UseInterceptors } from '@nestjs/common';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { DeleteAdoptionUseCase } from '../DeleteAdoption.useCase';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';

@UseInterceptors(TransactionInterceptor)
@Controller('adoption')
export class DeleteAdoptionController {
  constructor(private deleteAdoption: DeleteAdoptionUseCase) {}
  @Delete(':id')
  async handle(
    @Param() params: IdParamControllerDto,
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
