import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { FindAllPaginationControllerDto } from '../../../../common/dtos/FindAllPagination.controller.dto';
import { FindAllGuardiansUseCase } from '../FindAllGuardians.useCase';
import { Guardian } from 'src/entities/Guardian.entity';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { ShelterPermition } from 'src/common/guards/ShelterPermission.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthenticationGuardModule } from 'src/common/guards/authentication.module';

@Controller('guardian')
@UseGuards(AuthenticationGuardModule, ShelterPermition)
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
