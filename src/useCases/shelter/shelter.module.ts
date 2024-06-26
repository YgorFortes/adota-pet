import { Module } from '@nestjs/common';
import { CreateShelterModule } from './createShelter/createShelter.module';
import { FindAllSheltersModule } from './findAllShelters/findAllShelters.module';
import { FindShelterByIdModule } from './findShelterById/findShelterById.module';
import { UpdateShelterModule } from './updateShelter/updateShelter.module';
import { DeleteShelterModule } from './deleteShelter/deleteShelter.module';

@Module({
  imports: [
    CreateShelterModule,
    FindAllSheltersModule,
    FindShelterByIdModule,
    UpdateShelterModule,
    DeleteShelterModule,
  ],
  exports: [
    CreateShelterModule,
    FindAllSheltersModule,
    FindShelterByIdModule,
    UpdateShelterModule,
    DeleteShelterModule,
  ],
})
export class ShelterModule {}
