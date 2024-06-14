import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/infra/db/entities/Address.entity';
import { UpdateAddressUseCase } from './UpdateAddress.useCase';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { AddressRepository } from 'src/repositories/implementations/Address.repository';
import { Provide } from 'src/enum/provider.enum';
import { findAddressByCepProvider } from '../findAddressByCep/FindAddressByCep.provider';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [
    UpdateAddressUseCase,
    { provide: RepositoryType.IAddressRepository, useClass: AddressRepository },
    { provide: Provide.IAddressCepFinderProvider, useClass: findAddressByCepProvider },
  ],

  exports: [UpdateAddressUseCase],
})
export class UpdateAddressModule {}
