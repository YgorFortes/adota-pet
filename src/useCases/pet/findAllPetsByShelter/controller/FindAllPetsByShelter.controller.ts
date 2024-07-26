import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { FindAllPetsByShelterUseCase } from '../FindAllPetsByShelter.useCase';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Pet } from 'src/entities/Pet.entity';
import { FilterPetsControllerDto } from '../../findAllPets/dto/FilterPets.controller.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('pets')
export class FindAllPetsByShelterController {
  constructor(private findAllPetsByShelterUseCase: FindAllPetsByShelterUseCase) {}

  @Get('/shelter/:id')
  @UseInterceptors(CacheInterceptor)
  async handle(
    @Param() params: IdParamControllerDto,
    @Query() filters: FilterPetsControllerDto,
  ): Promise<IPagination<Pet>> {
    const shelterId = params.id;

    const pets = await this.findAllPetsByShelterUseCase.execute(shelterId, filters);

    return pets;
  }
}
