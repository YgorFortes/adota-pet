import { Inject, Injectable, Scope } from '@nestjs/common';
import { IAddressRepository } from '../interfaces/IAddressRepository.interface';
import { Address } from 'src/entities/Address.entity';
import { ICreateAddressDto } from 'src/useCases/address/createAddress/dtos/ICreateAddress.useCase.dto';
import { AddressEntity } from 'src/infra/db/entities/Address.entity';
import { DataSource } from 'typeorm';
import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';
import { BaseRepository } from './BaseRepository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AddressRepository extends BaseRepository<AddressEntity> implements IAddressRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(AddressEntity, dataSource, request);
  }

  async save(addressDto: ICreateAddressDto): Promise<Address> {
    const savedAddress = await this.repository.save(addressDto);

    return savedAddress;
  }

  async updateAddress(id: string, updateAddressDto: IUpdateAddressUseCaseDto): Promise<Address> {
    const result = await this.repository.update({ id }, { ...updateAddressDto });
    if (result.affected > 0) {
      return await this.repository.findOne({ where: { id } });
    }
  }
}
