import { Module } from '@nestjs/common';
import { CreateAdoptionModule } from './createAdoption/createAdoption.module';
import { DeleteAdoptionModule } from './deleteAdoption/deleteAdoption.module';

@Module({
  imports: [CreateAdoptionModule, DeleteAdoptionModule],
  exports: [CreateAdoptionModule, DeleteAdoptionModule],
})
export class AdoptionModule {}
