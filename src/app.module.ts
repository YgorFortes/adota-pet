import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { MessageModule } from './useCases/message/message.module';
import { AuthenticationMiddleware } from './common/middlewares/Authentication.middleware';
import { tokenModule } from './useCases/token/token.module';
import { ShelterAuthenticationMiddleware } from './common/middlewares/ShelterAuthorization.middleware';
import { GuardianAuthenticationMiddleware } from './common/middlewares/GuardianAuthorization.middleware';
@Module({
  imports: [
    GuardianModule,
    UserModule,
    AddressModule,
    ShelterModule,
    PetModule,
    AdoptionModule,
    MessageModule,
    tokenModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      {
        path: 'guardian',
        method: RequestMethod.ALL,
      },
      {
        path: 'guardian/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'logout',
        method: RequestMethod.ALL,
      },
      {
        path: 'adoption',
        method: RequestMethod.ALL,
      },
      {
        path: 'adoption/:id',
        method: RequestMethod.ALL,
      },
      { path: 'pet', method: RequestMethod.POST },
      { path: 'pet/:id', method: RequestMethod.PUT },
      { path: 'pet/:id', method: RequestMethod.DELETE },
      { path: 'shelter/pets/:id', method: RequestMethod.GET },
      { path: 'shelter', method: RequestMethod.POST },
      { path: 'shelter', method: RequestMethod.PUT },
      { path: 'shelter', method: RequestMethod.DELETE },
      { path: 'message', method: RequestMethod.ALL },
      { path: 'message/:id', method: RequestMethod.GET },
    );

    //Routes for Shelter role
    consumer
      .apply(ShelterAuthenticationMiddleware)
      .forRoutes(
        { path: 'shelter', method: RequestMethod.DELETE },
        { path: 'shelter', method: RequestMethod.POST },
        { path: 'shelter', method: RequestMethod.PUT },
        { path: 'shelter/pets/:id', method: RequestMethod.GET },
        { path: 'pet', method: RequestMethod.POST },
        { path: 'pet/:id', method: RequestMethod.PUT },
        { path: 'pet/:id', method: RequestMethod.DELETE },
        { path: 'adoption', method: RequestMethod.POST },
        { path: 'adoption/:id', method: RequestMethod.DELETE },
        { path: 'guardian', method: RequestMethod.GET },
        { path: 'guardian/:id', method: RequestMethod.GET },
        { path: 'message', method: RequestMethod.GET },
        { path: 'message/:id', method: RequestMethod.GET },
      );

    //Routes for Guardian role
    consumer
      .apply(GuardianAuthenticationMiddleware)
      .forRoutes(
        { path: 'guardian', method: RequestMethod.POST },
        { path: 'guardian', method: RequestMethod.DELETE },
        { path: 'guardian', method: RequestMethod.PUT },
        { path: 'message', method: RequestMethod.POST },
      );
  }
}
