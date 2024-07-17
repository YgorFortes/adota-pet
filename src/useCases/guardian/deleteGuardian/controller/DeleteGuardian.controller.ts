import { Controller, Delete, Request, UseInterceptors } from '@nestjs/common';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { DeleteGuardianUseCase } from '../DeleteGuardian.useCase';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { extractTokenHeader } from 'src/common/helpers/extractToken.helpers';

@Controller('guardian')
@UseInterceptors(TransactionInterceptor)
export class DeleteGuardianController {
  constructor(private deleteGuardianUseCase: DeleteGuardianUseCase) {}
  @Delete()
  async handle(@Request() request: IRequestWithUser): Promise<{ message: string }> {
    const idUser = request.user.sub;

    const token = extractTokenHeader(request);

    const result = await this.deleteGuardianUseCase.execute(idUser, token);

    if (result) {
      return { message: `Tutor deletado com sucesso.` };
    }
  }
}
