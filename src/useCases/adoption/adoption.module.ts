import { Module } from '@nestjs/common';
import { CreateAdoptionModule } from './createAdoption/createAdoption.module';

@Module({
  imports: [CreateAdoptionModule],
  exports: [CreateAdoptionModule],
})
export class AdoptionModule {}
