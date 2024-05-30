import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/db/entities/User.entity';
import { AuthenticationUserController } from './controller/AuthenticationUser.controller';
import { ConfigService } from '@nestjs/config';
import { AuthenticationUserUseCase } from './AuthenticationUser.useCase';
import { UserRepository } from 'src/repositories/implementations/User.repository';
import { FindUserByEmailModule } from '../findEmailByemail/findByEmail.module';
import { RepositoryType } from 'src/enum/RepositoryType.enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    FindUserByEmailModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SECRET'),
          signOptions: { expiresIn: '72h' },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
  ],
  controllers: [AuthenticationUserController],
  providers: [
    {
      provide: RepositoryType.IUserRepository,
      useClass: UserRepository,
    },
    AuthenticationUserUseCase,
  ],

  exports: [AuthenticationUserUseCase],
})
export class AuthenticationModule {}
