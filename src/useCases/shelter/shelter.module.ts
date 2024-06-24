import { Module } from '@nestjs/common';
import { CreateShelterModule } from './createShelter/createShelter.module';
import { FindAllSheltersModule } from './findAllShelters/findAllShelters.module';

@Module({
  imports: [CreateShelterModule, FindAllSheltersModule],
  exports: [CreateShelterModule, FindAllSheltersModule],
})
export class ShelterModule {}
