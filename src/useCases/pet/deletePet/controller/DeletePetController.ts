import { Controller, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { DeletePetUseCase } from '../DeletePet.useCase';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { ShelterPermition } from 'src/common/guards/ShelterPermission.guard';
import { FindByIdControllerDto } from 'src/common/dtos/FindById.controller.dto';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';

@UseGuards(AuthenticationGuard, ShelterPermition)
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
      return { message: 'Pet deletado com sucesso.' };
    }
  }
}
