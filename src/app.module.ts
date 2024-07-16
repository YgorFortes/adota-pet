import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExepectionErrror } from './resource/errors/Exeception.error';
import { GlobalLogger } from './resource/interceptor/global.interceptor';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './infra/config/Db.config';
import { ConfigModule } from '@nestjs/config';
import { GuardianModule } from './useCases/guardian/guadian.module';
import { UserModule } from './useCases/user/user.module';
import { AddressModule } from './useCases/address/address.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ShelterModule } from './useCases/shelter/shelter.module';
import { MulterModule } from '@nestjs/platform-express';
import { PetModule } from './useCases/pet/pet.module';
import { AdoptionModule } from './useCases/adoption/adoption.module';

@Module({
  imports: [
    GuardianModule,
    UserModule,
    AddressModule,
    ShelterModule,
    PetModule,
    AdoptionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
      inject: [PostgresConfig],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    CacheModule.register({ isGlobal: true, ttl: 60 }),
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
  ],
})
export class AppModule {}
