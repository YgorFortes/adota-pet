import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IAddressRepository } from 'src/repositories/interfaces/IAddressRepository.interface';
import { ICreateAddressDto } from './dtos/ICreateAddress.useCase.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Address } from 'src/entities/Address.entity';
import { IAddressCepFinderProvider } from '../findAddressByCep/interface/IAddressCepFinder.provider';
import { Provide } from 'src/common/enum/provider.enum';

@Injectable()
export class CreateAddressUseCase {
  constructor(
    @Inject(RepositoryType.IAddressRepository) private addressRepository: IAddressRepository,
    @Inject(Provide.IAddressCepFinderProvider)
    private addressCepFinderProvider: IAddressCepFinderProvider,
  ) {}

  async execute(createAddressDto: ICreateAddressDto): Promise<Address> {
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

  private async createAddressByCep(cep: string, complement?: string): Promise<Address> {
    const addressFindByCep = await this.addressCepFinderProvider.findAddressByCep(cep, complement);
    const address = await this.addressRepository.save(addressFindByCep);
    return address;
  }
}
