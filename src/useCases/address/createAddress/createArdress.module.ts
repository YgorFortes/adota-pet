import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/infra/db/entities/Address.entity';
import { CreateAddressUseCase } from './CreateAddress.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { AddressRepository } from 'src/repositories/implementations/Address.repository';
import { Provide } from 'src/common/enum/provider.enum';
import { findAddressByCepProvider } from '../findAddressByCep/FindAddressByCep.provider';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [],
  providers: [
    CreateAddressUseCase,
    { provide: RepositoryType.IAddressRepository, useClass: AddressRepository },
    { provide: Provide.IAddressCepFinderProvider, useClass: findAddressByCepProvider },
  ],
  exports: [CreateAddressUseCase],
})
export class CreateAddressModule {}
