import { Controller, Get, Param } from '@nestjs/common';
import { FindShelterByIdUseCase } from '../FindShelterById.useCase';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { Shelter } from 'src/entities/Shelter.entity';

@Controller('shelter')
export class FindShelterByIdController {
  constructor(private findShelterByIdUseCase: FindShelterByIdUseCase) {}

  @Get(':id')
  async handle(@Param() params: IdParamControllerDto): Promise<Shelter> {
    const shelter = await this.findShelterByIdUseCase.execute(params.id);

    return shelter;
  }
}
