import { Module } from '@nestjs/common';
import { CreateAddressUseCase } from './CreateAddress.useCase';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { AddressRepository } from 'src/repositories/implementations/Address.repository';
import { Provide } from 'src/common/enum/provider.enum';
import { findAddressByCepProvider } from '../findAddressByCep/FindAddressByCep.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CreateAddressUseCase,
    { provide: RepositoryType.IAddressRepository, useClass: AddressRepository },
    { provide: Provide.IAddressCepFinderProvider, useClass: findAddressByCepProvider },
  ],
  exports: [CreateAddressUseCase],
})
export class CreateAddressModule {}
