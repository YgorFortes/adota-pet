import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindAllPetsByShelterUseCase } from '../FindAllPetsByShelter.useCase';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Pet } from 'src/entities/Pet.entity';

@Controller('pets')
export class FindAllPetsByShelterController {
  constructor(private findAllPetsByShelterUseCase: FindAllPetsByShelterUseCase) {}

  @Get('/shelter/:id')
  async handle(
    @Param() params: IdParamControllerDto,
    @Query() pagination: FindAllPaginationControllerDto,
  ): Promise<IPagination<Pet>> {
    const shelterId = params.id;

    const pets = await this.findAllPetsByShelterUseCase.execute(shelterId, pagination);

    return pets;
  }
}
