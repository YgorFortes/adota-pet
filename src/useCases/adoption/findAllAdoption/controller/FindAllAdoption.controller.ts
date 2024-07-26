import { Controller, Get, Query, Request, UseInterceptors } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces/IPagination.interface';
import { Adoption } from 'src/entities/Adoption.entity';
import { FindAllAdoptionUseCase } from '../FindAllAdoption.useCase';
import { FilterFindAllAdoptionControllerDto } from '../dto/FiltersFindAllAdoption.controller.dto';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('adoption')
export class FindAllAdoptionController {
  constructor(private findAllAdoptionUseCase: FindAllAdoptionUseCase) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async handle(
    @Query() filters: FilterFindAllAdoptionControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<IPagination<Adoption>> {
    const userId = request.user.sub;
    const adoptions = await this.findAllAdoptionUseCase.execute(filters, userId);
    return adoptions;
  }
}
