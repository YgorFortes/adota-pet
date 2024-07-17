import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { Guardian } from 'src/entities/Guardian.entity';
import { FindByIdControllerDto } from '../../../../common/dtos/FindById.controller.dto';
import { FindGuardianByIdUseCase } from '../FindGuardianById.useCase';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('guardian')
export class FindGuardianByIdController {
  constructor(private findGuardianByIdUseCase: FindGuardianByIdUseCase) {}

  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async handle(@Param() params: FindByIdControllerDto): Promise<Guardian> {
    const guardian = await this.findGuardianByIdUseCase.execute(params.id);
    return guardian;
  }
}
