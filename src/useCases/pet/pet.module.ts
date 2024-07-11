import { Module } from '@nestjs/common';
import { CreatePetModule } from './createPet/createPet.module';
import { FindAllPetsModule } from './findAllPets/findAllPets.module';
import { FindPetByIdModule } from './findPetById/findPetById.module';
import { UpdatePetModule } from './updatePet/updatePet.module';
import { DeletePetModule } from './deletePet/deletePet.module';
import { FindPetByShelterModule } from './findPetByShelter/findPetByShelter.module';

@Module({
  imports: [
    CreatePetModule,
    FindAllPetsModule,
    FindPetByIdModule,
    FindPetByShelterModule,
    UpdatePetModule,
    DeletePetModule,
  ],
  exports: [
    CreatePetModule,
    FindAllPetsModule,
    FindPetByIdModule,
    FindPetByShelterModule,
    UpdatePetModule,
    DeletePetModule,
  ],
})
export class PetModule {}
