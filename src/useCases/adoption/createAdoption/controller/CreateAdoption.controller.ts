import { Body, Controller, Post, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { ShelterPermition } from 'src/common/guards/ShelterPermission.guard';
import { CreateAdoptionControllerDto } from '../dtos/CreateAdoption.controller.dto';
import { CreateAdoptionUseCase } from '../CreateAdoption.useCase';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { AdoptionWithoutGuardianAndPet } from 'src/repositories/interfaces/IAdoptionRepository.interface';
import { AuthenticationGuardModule } from 'src/common/guards/authentication.module';

@Controller('/adoption')
@UseGuards(AuthenticationGuardModule, ShelterPermition)
@UseInterceptors(TransactionInterceptor)
export class CreateAdoptionContoller {
  constructor(private createAdoptionUseCase: CreateAdoptionUseCase) {}
  @Post()
  async handle(
    @Body() createAdoptionDto: CreateAdoptionControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<{ message: string; adoption: AdoptionWithoutGuardianAndPet }> {
    const userId = request.user.sub;
    const adoptionCreated = await this.createAdoptionUseCase.execute(createAdoptionDto, userId);

    return { message: 'Adoção criada com suecesso', adoption: adoptionCreated };
  }
}
