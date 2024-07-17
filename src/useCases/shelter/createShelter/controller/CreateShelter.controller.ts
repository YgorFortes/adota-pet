import { Body, Controller, Post, Request, UseInterceptors } from '@nestjs/common';
import { CreateShelterControllerDto } from '../dtos/CreateShelter.controller.dto';
import { CreateShelterUseCase } from '../CreateShelter.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { Shelter } from 'src/entities/Shelter.entity';
import { TransactionInterceptor } from 'src/resource/interceptor/transaction.interceptor';

@Controller('shelter')
export class CreateShelterController {
  constructor(private createShelterUseCase: CreateShelterUseCase) {}
  @Post()
  @UseInterceptors(TransactionInterceptor)
  async handle(
    @Body() createShelterDto: CreateShelterControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<{ message: string; shelter: Shelter }> {
    const idUser = request.user.sub;
    const shelterCreated = await this.createShelterUseCase.execute({ idUser, ...createShelterDto });

    return { message: 'Abrigo criado com sucesso.', shelter: shelterCreated };
  }
}
