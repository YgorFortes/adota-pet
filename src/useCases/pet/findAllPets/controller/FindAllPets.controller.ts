import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Query } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { FindAllPaginationControllerDto } from 'src/common/dtos/FindAllPagination.controller.dto';
import { FindAllPetsUseCase } from '../FindAllPets.useCase';
import { Pet } from 'src/entities/Pet.entity';
import { IPagination } from 'src/common/interfaces/IPagination.interface';

@Controller('/pets')
export class FindAllPetsController {
  constructor(private findAllPetsUseCase: FindAllPetsUseCase) {}
  @Get()
  @UseInterceptors(CacheInterceptor)
  async handle(@Query() pagination: FindAllPaginationControllerDto): Promise<IPagination<Pet>> {
    const pets = await this.findAllPetsUseCase.execute(pagination);

    return pets;
  }
}
