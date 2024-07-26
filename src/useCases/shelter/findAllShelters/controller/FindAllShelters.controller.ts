import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { Shelter } from 'src/entities/Shelter.entity';
import { FindAllSheltersUseCase } from '../FindAllShelters.useCase';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { FiltersFindAllSheltersDto } from '../dto/FiltersFindAllShelters.controller.dto';

@Controller('shelter')
export class FindAllSheltersController {
  constructor(private readonly findAllShelterUseCase: FindAllSheltersUseCase) {}
  @Get()
  @UseInterceptors(CacheInterceptor)
  async handle(@Query() filters: FiltersFindAllSheltersDto): Promise<IPagination<Shelter>> {
    const allShelters = await this.findAllShelterUseCase.execute(filters);
    return allShelters;
  }
}
