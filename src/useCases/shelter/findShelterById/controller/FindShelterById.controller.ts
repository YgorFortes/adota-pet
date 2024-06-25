import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { FindShelterByIdUseCase } from '../FindShelterById.useCase';
import { FindByIdControllerDto } from 'src/common/dtos/FindById.controller.dto';
import { Shelter } from 'src/entities/Shelter.entity';

@Controller('shelter')
@UseGuards(AuthenticationGuard)
export class FindShelterByIdController {
  constructor(private findShelterByIdUseCase: FindShelterByIdUseCase) {}

  @Get(':id')
  async handle(@Param() params: FindByIdControllerDto): Promise<Shelter> {
    const shelter = await this.findShelterByIdUseCase.execute(params.id);

    return shelter;
  }
}
