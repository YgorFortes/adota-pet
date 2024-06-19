import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IAddressRepository } from 'src/repositories/interfaces/IAddressRepository.interface';
import { ICreateAddressDto } from './dtos/ICreateAddress.useCase.dto';

import { Inject, Injectable } from '@nestjs/common';
import { Address } from 'src/entities/Address.entity';
import { IAddressCepFinderProvider } from '../findAddressByCep/interface/IAddressCepFinder.provider';
import { Provide } from 'src/enum/provider.enum';
import { EntityManager } from 'typeorm';

@Injectable()
export class CreateAddressUseCase {
  constructor(
    @Inject(RepositoryType.IAddressRepository) private addressRepository: IAddressRepository,
    @Inject(Provide.IAddressCepFinderProvider)
    private addressCepFinderProvider: IAddressCepFinderProvider,
  ) {}

  async execute(
    createAddressDto: ICreateAddressDto,
    transaction?: EntityManager,
  ): Promise<Address> {
    if (transaction) {
      return await this.createAddressWithTransation(createAddressDto, transaction);
    }

    return await this.createAddress(createAddressDto);
  }

  private async createAddress(createAddressDto: ICreateAddressDto): Promise<Address> {
    if (createAddressDto.cep) {
      return await this.createAddressByCep(createAddressDto.cep, createAddressDto.complement);
    } else {
      const createdAddress = await this.addressRepository.save(createAddressDto);
      return createdAddress;
    }
  }

  private async createAddressByCep(
    cep: string,
    complement?: string,
    transaction?: EntityManager,
  ): Promise<Address> {
    const addressFindByCep = await this.addressCepFinderProvider.findAddressByCep(cep, complement);
    const address = await this.addressRepository.save(addressFindByCep, transaction);
    return address;
  }

  private async createAddressWithTransation(
    createAddressDto: ICreateAddressDto,
    transaction: EntityManager,
  ): Promise<Address> {
    return transaction.transaction(async transactionalEntityManager => {
      if (createAddressDto.cep) {
        return await this.createAddressByCep(
          createAddressDto.cep,
          createAddressDto.complement,
          transactionalEntityManager,
        );
      }

      const address = await this.addressRepository.save(
        createAddressDto,
        transactionalEntityManager,
      );
      return address;
    });
  }
}
