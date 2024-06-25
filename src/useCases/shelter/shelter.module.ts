import { Module } from '@nestjs/common';
import { CreateShelterModule } from './createShelter/createShelter.module';
import { FindAllSheltersModule } from './findAllShelters/findAllShelters.module';
import { FindShelterByIdModule } from './findShelterById/findShelterById.module';

@Module({
  imports: [CreateShelterModule, FindAllSheltersModule, FindShelterByIdModule],
  exports: [CreateShelterModule, FindAllSheltersModule, FindShelterByIdModule],
})
export class ShelterModule {}
