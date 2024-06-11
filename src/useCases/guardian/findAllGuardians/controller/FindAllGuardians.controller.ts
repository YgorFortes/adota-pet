import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/Authentication.guard';
import { FindAllGuardiansControllerDto } from '../dtos/FindAllGuardians.controller.dto';
import { FindAllGuardiansUseCase } from '../FindAllGuardians.useCase';
import { Guardian } from 'src/entities/Guardian.entity';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { ShelterPermition } from 'src/common/guards/ShelterPermission.guard';

@Controller('guardian')
//TODO tem que ser shelter para ohar essa rota
@UseGuards(AuthenticationGuard, ShelterPermition)
export class FindAllGuardiansController {
  constructor(private findAllGuardiansUseCase: FindAllGuardiansUseCase) {}
  @Get()
  async handle(@Query() pagination: FindAllGuardiansControllerDto): Promise<IPagination<Guardian>> {
    const allGuardians = await this.findAllGuardiansUseCase.execute(pagination);

    return allGuardians;
  }
}
