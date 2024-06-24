import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { FindAllPaginationControllerDto } from '../../../../common/dtos/FindAllPagination.controller.dto';
import { FindAllGuardiansUseCase } from '../FindAllGuardians.useCase';
import { Guardian } from 'src/entities/Guardian.entity';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { ShelterPermition } from 'src/common/guards/ShelterPermission.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('guardian')
@UseGuards(AuthenticationGuard, ShelterPermition)
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
