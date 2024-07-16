import { Module } from '@nestjs/common';
import { AuthenticationGuard } from './Authentication.guard';
import { tokenModule } from 'src/useCases/token/token.module';

@Module({
  imports: [tokenModule],
  providers: [AuthenticationGuard],

  exports: [AuthenticationGuard],
})
export class AuthenticationGuardModule {}
