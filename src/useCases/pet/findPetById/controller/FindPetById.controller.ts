import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { FindPetByIdUseCase } from '../FindPetById.useCase';
import { Pet } from 'src/entities/Pet.entity';

@Controller('pet')
export class FindPetByIdController {
  constructor(private findPetById: FindPetByIdUseCase) {}
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async handle(@Param() params: IdParamControllerDto): Promise<Pet> {
    const pet = await this.findPetById.execute(params.id);
    return pet;
  }
}
