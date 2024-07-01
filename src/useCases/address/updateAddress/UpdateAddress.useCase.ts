import { Inject, Injectable } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IAddressRepository } from 'src/repositories/interfaces/IAddressRepository.interface';
import { IUpdateAddressUseCaseDto } from './dtos/IUpdateAddress.useCase.dto';
import { IAddressCepFinderProvider } from '../findAddressByCep/interface/IAddressCepFinder.provider';
import { Provide } from 'src/common/enum/provider.enum';
import { Address } from 'src/entities/Address.entity';

@Injectable()
export class UpdateAddressUseCase {
  constructor(
    @Inject(RepositoryType.IAddressRepository) private addressRepository: IAddressRepository,
    @Inject(Provide.IAddressCepFinderProvider)
    private addressCepFinderProvider: IAddressCepFinderProvider,
  ) {}

  async execute(id: string, updateAddressDto: IUpdateAddressUseCaseDto): Promise<Address> {
    if (updateAddressDto.cep) {
      return await this.updateAddressByCep(id, updateAddressDto.cep, updateAddressDto.complement);
    }

    return await this.addressRepository.updateAddress(id, { ...updateAddressDto });
  }

  private async updateAddressByCep(id: string, cep: string, complement?: string): Promise<Address> {
    const addressFindByCep = await this.addressCepFinderProvider.findAddressByCep(cep, complement);
    const address = await this.addressRepository.updateAddress(id, { ...addressFindByCep });
    return address;
  }
}
