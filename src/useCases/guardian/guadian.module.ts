import { Module } from '@nestjs/common';

import { CreateGuardianModule } from './createGuardian/createGuardian.module';
import { FindAllGuardiansModule } from './findAllGuardians/findAllGuardians.module';
import { FindGuardianByIdModule } from './findGuardianById/findGuardianById.module';
import { UpdateGuardianModule } from './updateGuardian/updateGuardian.module';

@Module({
  imports: [
    CreateGuardianModule,
    FindAllGuardiansModule,
    FindGuardianByIdModule,
    UpdateGuardianModule,
  ],
  exports: [
    CreateGuardianModule,
    FindAllGuardiansModule,
    FindGuardianByIdModule,
    UpdateGuardianModule,
  ],
})
export class GuardianModule {}
