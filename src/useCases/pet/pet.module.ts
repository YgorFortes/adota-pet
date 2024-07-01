import { Module } from '@nestjs/common';
import { CreatePetModule } from './createPet/createPet.module';
import { FindAllPetsModule } from './findAllPets/findAllPets.module';

@Module({
  imports: [CreatePetModule, FindAllPetsModule],
  exports: [CreatePetModule, FindAllPetsModule],
})
export class PetModule {}
