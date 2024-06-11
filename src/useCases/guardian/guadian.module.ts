import { Module } from '@nestjs/common';

import { CreateGuardianModule } from './createGuardian/createGuardian.module';
import { FindAllGuardiansModule } from './findAllGuardians/findAllGuardians.module';

@Module({
  imports: [CreateGuardianModule, FindAllGuardiansModule],
  exports: [CreateGuardianModule, FindAllGuardiansModule],
})
export class GuardianModule {}
