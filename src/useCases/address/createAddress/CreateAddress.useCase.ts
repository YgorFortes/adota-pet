import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IAddressRepository } from 'src/repositories/interfaces/IAddressRepository.interface';
import { ICreateAddressDto } from './dtos/ICreateAddress.useCase.dto';

import { Inject, Injectable } from '@nestjs/common';
import { Address } from 'src/entities/Address.entity';
import { IAddressCepFinderProvider } from '../findAddressByCep/interface/IAddressCepFinder.provider';

@Injectable()
export class CreateAddressUseCase {
  constructor(
    @Inject(RepositoryType.IAddressRepository) private addressRepository: IAddressRepository,
    @Inject('IAddressCepFinderProvider')
    private addressCepFinderProvider: IAddressCepFinderProvider,
  ) {}

  async execute(dataAdress: ICreateAddressDto): Promise<Address> {
    if (dataAdress.cep) {
      return await this.createAddressByCep(dataAdress.cep, dataAdress.complement);
    }

    const address = await this.addressRepository.save(dataAdress);
    return address;
  }

  private async createAddressByCep(cep: string, complement?: string): Promise<Address> {
    const addressFindByCep = await this.addressCepFinderProvider.findAddressByCep(cep, complement);
    const address = await this.addressRepository.save(addressFindByCep);
    return address;
  }
}
