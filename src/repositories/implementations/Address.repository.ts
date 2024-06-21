import { Inject, Injectable, Scope } from '@nestjs/common';
import { IAddressRepository } from '../interfaces/IAddressRepository.interface';
import { Address } from 'src/entities/Address.entity';
import { ICreateAddressDto } from 'src/useCases/address/createAddress/dtos/ICreateAddress.useCase.dto';
import { AddressEntity } from 'src/infra/db/entities/Address.entity';
import { DataSource } from 'typeorm';
import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';
import { BaseRepository } from '../BaseRepository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AddressRepository extends BaseRepository implements IAddressRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  } // @InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>,

  async save(addressDto: ICreateAddressDto): Promise<Address> {
    const addressRepository = this.getRepository(AddressEntity);
    const savedAddress = await addressRepository.save(addressDto);
    return savedAddress;
  }

  async updateAddress(id: string, updateAddressDto: IUpdateAddressUseCaseDto): Promise<Address> {
    const addressRepository = this.getRepository(AddressEntity);
    const result = await addressRepository.update({ id }, { ...updateAddressDto });
    if (result.affected > 0) {
      return await addressRepository.findOne({ where: { id } });
    }
  }
}
