import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { FindShelterByIdUseCase } from '../FindShelterById.useCase';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { Shelter } from 'src/entities/Shelter.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('shelter')
export class FindShelterByIdController {
  constructor(private findShelterByIdUseCase: FindShelterByIdUseCase) {}

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async handle(@Param() params: IdParamControllerDto): Promise<Shelter> {
    const shelter = await this.findShelterByIdUseCase.execute(params.id);

    return shelter;
  }
}
