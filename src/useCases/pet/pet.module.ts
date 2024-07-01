import { Module } from '@nestjs/common';
import { CreatePetModule } from './createPet/createPet.module';

@Module({
  imports: [CreatePetModule],
  exports: [CreatePetModule],
})
export class PetModule {}
