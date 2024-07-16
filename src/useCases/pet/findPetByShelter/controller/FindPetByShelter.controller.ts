import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ShelterPermition } from 'src/common/guards/ShelterPermission.guard';
import { FindByIdControllerDto } from 'src/common/dtos/FindById.controller.dto';
import { FindPetByShelterUseCase } from '../FindPetByShelter.useCase';
import { IRequestWithUser } from 'src/common/interfaces/IRequestWithUser.interface';
import { Pet } from 'src/entities/Pet.entity';
import { AuthenticationGuardModule } from 'src/common/guards/authentication.module';

@Controller('shelter/pets')
@UseGuards(AuthenticationGuardModule, ShelterPermition)
export class FindPetByShelterController {
  constructor(private findPetByShelterUseCase: FindPetByShelterUseCase) {}
  @Get(':id')
  async handle(
    @Param() params: FindByIdControllerDto,
    @Request() request: IRequestWithUser,
  ): Promise<Omit<Pet, 'shelter'>> {
    const userId = request.user.sub;
    const petId = params.id;
    const pet = await this.findPetByShelterUseCase.execute(petId, userId);

    return pet;
  }
}
