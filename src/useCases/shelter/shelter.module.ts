import { Module } from '@nestjs/common';
import { CreateShelterModule } from './createShelter/createShelter.module';

@Module({
  imports: [CreateShelterModule],
  exports: [CreateShelterModule],
})
export class ShelterModule {}
