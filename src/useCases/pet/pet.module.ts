import { Module } from '@nestjs/common';
import { CreatePetModule } from './createPet/createPet.module';
import { FindAllPetsModule } from './findAllPets/findAllPets.module';
import { FindPetByIdModule } from './findPetById/findPetById.module';
import { UpdatePetModule } from './updatePet/updatePet.module';
import { DeletePetModule } from './deletePet/deletePet.module';

@Module({
  imports: [
    CreatePetModule,
    FindAllPetsModule,
    FindPetByIdModule,
    UpdatePetModule,
    DeletePetModule,
  ],
  exports: [
    CreatePetModule,
    FindAllPetsModule,
    FindPetByIdModule,
    UpdatePetModule,
    DeletePetModule,
  ],
})
export class PetModule {}
