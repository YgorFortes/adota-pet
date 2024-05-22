import { ConsoleLogger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExepectionErrror } from './resource/errors/Exeception.error';
import { GlobalLogger } from './resource/interceptor/global.logger';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './infra/config/db.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
      inject: [PostgresConfig],
    }),
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
  ],
})
export class AppModule {}
