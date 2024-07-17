import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { FindAllPaginationControllerDto } from '../../../../common/dtos/FindAllPagination.controller.dto';
import { FindAllGuardiansUseCase } from '../FindAllGuardians.useCase';
import { Guardian } from 'src/entities/Guardian.entity';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('guardian')
export class FindAllGuardiansController {
  constructor(private findAllGuardiansUseCase: FindAllGuardiansUseCase) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async handle(
    @Query() pagination: FindAllPaginationControllerDto,
  ): Promise<IPagination<Guardian>> {
    const allGuardians = await this.findAllGuardiansUseCase.execute(pagination);

    return allGuardians;
  }
}
