import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Query } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { FindAllPetsUseCase } from '../FindAllPets.useCase';
import { Pet } from 'src/entities/Pet.entity';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { FilterPetsControllerDto } from '../dto/FilterPets.controller.dto';

@Controller('/pets')
export class FindAllPetsController {
  constructor(private findAllPetsUseCase: FindAllPetsUseCase) {}
  @Get()
  @UseInterceptors(CacheInterceptor)
  async handle(@Query() filters: FilterPetsControllerDto): Promise<IPagination<Pet>> {
    const pets = await this.findAllPetsUseCase.execute(filters);

    return pets;
  }
}
