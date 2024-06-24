import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { Shelter } from 'src/entities/Shelter.entity';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';
import { FindAllSheltersUseCase } from '../FindAllShelters.useCase';
import { IPagination } from 'src/common/interfaces/IPagination.interface';

@Controller('shelter')
@UseGuards(AuthenticationGuard)
export class FindAllSheltersController {
  constructor(private readonly findAllShelterUseCase: FindAllSheltersUseCase) {}
  @Get()
  @UseInterceptors(CacheInterceptor)
  async handle(@Query() pagination: FindAllPaginationControllerDto): Promise<IPagination<Shelter>> {
    const allShelters = await this.findAllShelterUseCase.execute(pagination);
    return allShelters;
  }
}
