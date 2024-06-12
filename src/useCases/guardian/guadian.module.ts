import { Module } from '@nestjs/common';

import { CreateGuardianModule } from './createGuardian/createGuardian.module';
import { FindAllGuardiansModule } from './findAllGuardians/findAllGuardians.module';
import { FindGuardianByIdModule } from './findGuardianById/findGuardianById.module';

@Module({
  imports: [CreateGuardianModule, FindAllGuardiansModule, FindGuardianByIdModule],
  exports: [CreateGuardianModule, FindAllGuardiansModule, FindGuardianByIdModule],
})
export class GuardianModule {}
