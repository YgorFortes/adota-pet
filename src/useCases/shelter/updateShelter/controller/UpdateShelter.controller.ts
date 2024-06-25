import { Body, Controller, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { RoleUserGuard } from 'src/common/guards/RoleUser.guard';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { UpdateShelterUseCase } from '../UpdateShelter.useCase';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { UpdateShelterControllerDto } from '../dtos/UpdateShelter.controller.dto';
import { Shelter } from 'src/entities/Shelter.entity';

@Controller('shelter')
@UseGuards(AuthenticationGuard, RoleUserGuard)
@UseInterceptors(TransactionInterceptor)
export class UpdateShelterController {
  constructor(private updateShelterUseCase: UpdateShelterUseCase) {}
  @Put()
  async handle(
    @Body() updateShelterDto: UpdateShelterControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<{ shelter: Shelter }> {
    const userId = request.user.sub;
    const shelterUpdated = await this.updateShelterUseCase.execute(userId, updateShelterDto);

    return { shelter: shelterUpdated };
  }
}
