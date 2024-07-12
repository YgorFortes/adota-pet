import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ShelterPermition } from 'src/common/guards/ShelterPermission.guard';
import { Guardian } from 'src/entities/Guardian.entity';
import { FindByIdControllerDto } from '../../../../common/dtos/FindById.controller.dto';
import { FindGuardianByIdUseCase } from '../FindGuardianById.useCase';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthenticationGuardModule } from 'src/common/guards/authentication.module';

@Controller('guardian')
@UseGuards(AuthenticationGuardModule, ShelterPermition)
export class FindGuardianByIdController {
  constructor(private findGuardianByIdUseCase: FindGuardianByIdUseCase) {}

  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async handle(@Param() params: FindByIdControllerDto): Promise<Guardian> {
    const guardian = await this.findGuardianByIdUseCase.execute(params.id);
    return guardian;
  }
}
