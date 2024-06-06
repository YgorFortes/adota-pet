import { Module } from '@nestjs/common';

import { CreateGuardianModule } from './createGuardian/createGuardian.module';

@Module({
  imports: [CreateGuardianModule],
  exports: [CreateGuardianModule],
})
export class GuardianModule {}
