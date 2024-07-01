import { Module } from '@nestjs/common';
import { CreatePetModule } from './createPet/createPet.module';
import { FindAllPetsModule } from './findAllPets/findAllPets.module';
import { FindPetByIdModule } from './findPetById/findPetById.module';

@Module({
  imports: [CreatePetModule, FindAllPetsModule, FindPetByIdModule],
  exports: [CreatePetModule, FindAllPetsModule, FindPetByIdModule],
})
export class PetModule {}
