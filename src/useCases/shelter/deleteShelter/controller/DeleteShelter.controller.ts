import { Controller, Delete, Request, UseInterceptors } from '@nestjs/common';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { DeleteShelterUseCase } from '../DeleteShelter.useCase';
import { extractTokenHeader } from 'src/common/helpers/extractToken.helpers';

@Controller('shelter')
@UseInterceptors(TransactionInterceptor)
export class DeleteShelterController {
  constructor(private deleteShelterUseCase: DeleteShelterUseCase) {}
  @Delete()
  async handle(@Request() request: IRequestWithUser): Promise<{ message: string }> {
    const userId = request.user.sub;

    const token = extractTokenHeader(request);

    const result = await this.deleteShelterUseCase.execute(userId, token);

    if (result) {
      return { message: `Abrigo deletado com sucesso.` };
    }
  }
}
