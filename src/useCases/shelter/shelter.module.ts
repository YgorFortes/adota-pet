import { Module } from '@nestjs/common';
import { CreateShelterModule } from './createShelter/createShelter.module';
import { FindAllSheltersModule } from './findAllShelters/findAllShelters.module';
import { FindShelterByIdModule } from './findShelterById/findShelterById.module';
import { UpdateShelterModule } from './updateShelter/updateShelter.module';

@Module({
  imports: [CreateShelterModule, FindAllSheltersModule, FindShelterByIdModule, UpdateShelterModule],
  exports: [CreateShelterModule, FindAllSheltersModule, FindShelterByIdModule, UpdateShelterModule],
})
export class ShelterModule {}
