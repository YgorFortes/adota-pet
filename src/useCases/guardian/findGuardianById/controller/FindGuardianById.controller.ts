import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { Guardian } from 'src/entities/Guardian.entity';
import { IdParamControllerDto } from '../../../../common/dtos/IdParam.controller.dto';
import { FindGuardianByIdUseCase } from '../FindGuardianById.useCase';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('guardian')
export class FindGuardianByIdController {
  constructor(private findGuardianByIdUseCase: FindGuardianByIdUseCase) {}

  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async handle(@Param() params: IdParamControllerDto): Promise<Guardian> {
    const guardian = await this.findGuardianByIdUseCase.execute(params.id);
    return guardian;
  }
}
