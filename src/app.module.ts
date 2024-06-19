import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExepectionErrror } from './resource/errors/Exeception.error';
import { GlobalLogger } from './resource/interceptor/Global.logger';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './infra/config/Db.config';
import { ConfigModule } from '@nestjs/config';
import { GuardianModule } from './useCases/guardian/guadian.module';
import { UserModule } from './useCases/user/user.module';
import { AddressModule } from './useCases/address/address.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ShelterModule } from './useCases/shelter/shelter.module';

@Module({
  imports: [
    GuardianModule,
    UserModule,
    AddressModule,
    ShelterModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
      inject: [PostgresConfig],
    }),
    CacheModule.register({ isGlobal: true, ttl: 10000 }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConsoleLogger,
    {
      provide: APP_FILTER,
      useClass: ExepectionErrror,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLogger,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    ConsoleLogger,
  ],
})
export class AppModule {}
