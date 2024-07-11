import { Module } from '@nestjs/common';
import { UpdateAddressUseCase } from './UpdateAddress.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { AddressRepository } from 'src/repositories/implementations/Address.repository';
import { Provide } from 'src/common/enum/provider.enum';
import { findAddressByCepProvider } from '../findAddressByCep/FindAddressByCep.provider';

@Module({
  imports: [],
  providers: [
    UpdateAddressUseCase,
    { provide: RepositoryType.IAddressRepository, useClass: AddressRepository },
    { provide: Provide.IAddressCepFinderProvider, useClass: findAddressByCepProvider },
  ],

  exports: [UpdateAddressUseCase],
})
export class UpdateAddressModule {}
