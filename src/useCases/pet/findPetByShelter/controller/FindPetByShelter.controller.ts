import { Controller, Get, Param, Request } from '@nestjs/common';
import { IdParamControllerDto } from 'src/common/dtos/IdParam.controller.dto';
import { FindPetByShelterUseCase } from '../FindPetByShelter.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { Pet } from 'src/entities/Pet.entity';

@Controller('shelter/pet')
export class FindPetByShelterController {
  constructor(private findPetByShelterUseCase: FindPetByShelterUseCase) {}
  @Get(':id')
  async handle(
    @Param() params: IdParamControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<Omit<Pet, 'shelter'>> {
    const userId = request.user.sub;
    const petId = params.id;
    const pet = await this.findPetByShelterUseCase.execute(petId, userId);

    return pet;
  }
}
