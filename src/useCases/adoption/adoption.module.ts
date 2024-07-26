import { Module } from '@nestjs/common';
import { CreateAdoptionModule } from './createAdoption/createAdoption.module';
import { DeleteAdoptionModule } from './deleteAdoption/deleteAdoption.module';
import { FindAllAdoptionModule } from './findAllAdoption/findAllAdoption.module';

@Module({
  imports: [CreateAdoptionModule, FindAllAdoptionModule, DeleteAdoptionModule],
  exports: [CreateAdoptionModule, FindAllAdoptionModule, DeleteAdoptionModule],
})
export class AdoptionModule {}
