import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { ShelterPermition } from 'src/common/guards/ShelterPermission.guard';
import { Guardian } from 'src/entities/Guardian.entity';
import { FindAllGuardiansControllerDto } from '../dtos/FindGuardianById.controller.dto';
import { FindGuardianByIdUseCase } from '../FindGuardianById.useCase';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('guardian')
@UseGuards(AuthenticationGuard, ShelterPermition)
export class FindGuardianByIdController {
  constructor(private findGuardianByIdUseCase: FindGuardianByIdUseCase) {}

  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async handle(@Param() params: FindAllGuardiansControllerDto): Promise<Guardian> {
    console.log('Entrou');
    const guardian = await this.findGuardianByIdUseCase.execute(params.id);
    return guardian;
  }
}
