import { Controller, Delete, Param, Request, UseInterceptors } from '@nestjs/common';
import { DeletePetUseCase } from '../DeletePet.useCase';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';

@Controller('pet')
@UseInterceptors(TransactionInterceptor)
export class DeletePetController {
  constructor(private deletePetUseCase: DeletePetUseCase) {}

  @Delete(':id')
  async handle(
    @Param() params: IdParamControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<{ message: string }> {
    const userId = request.user.sub;
    const result = await this.deletePetUseCase.execute(params.id, userId);

    if (result) {
      return { message: `Pet id: ${params.id} deletado com sucesso.` };
    }
  }
}
