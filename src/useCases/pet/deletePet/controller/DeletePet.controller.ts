import { Controller, Delete, Param, Request } from '@nestjs/common';
import { DeletePetUseCase } from '../DeletePet.useCase';
import { FindByIdControllerDto } from 'src/common/dtos/FindById.controller.dto';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';

@Controller('pet')
export class DeletePetController {
  constructor(private deletePetUseCase: DeletePetUseCase) {}

  @Delete(':id')
  async handle(
    @Param() params: FindByIdControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<{ message: string }> {
    const userId = request.user.sub;
    const result = await this.deletePetUseCase.execute(params.id, userId);

    if (result) {
      return { message: `Pet id: ${params.id} deletado com sucesso.` };
    }
  }
}
