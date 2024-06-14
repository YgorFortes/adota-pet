import { Injectable } from '@nestjs/common';
import { IAddressRepository } from '../interfaces/IAddressRepository.interface';
import { Address } from 'src/entities/Address.entity';
import { ICreateAddressDto } from 'src/useCases/address/createAddress/dtos/ICreateAddress.useCase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/infra/db/entities/Address.entity';
import { EntityManager, Repository } from 'typeorm';
import { IUpdateAddressUseCaseDto } from 'src/useCases/address/updateAddress/dtos/IUpdateAddress.useCase.dto';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async save(
    addressDto: ICreateAddressDto,
    transactionalEntityManager?: EntityManager,
  ): Promise<Address> {
    const entityManager = transactionalEntityManager || this.entityManager;

    return entityManager.transaction(async transEntityManager => {
      const addressEntity = transEntityManager.create(AddressEntity, addressDto);

      const savedAddress = await transEntityManager.save(addressEntity);
      return savedAddress;
    });
  }

  async updateAddress(id: string, updateAddressDto: IUpdateAddressUseCaseDto): Promise<Address> {
    const result = await this.addressRepository.update({ id }, { ...updateAddressDto });
    if (result.affected > 0) {
      return await this.addressRepository.findOne({ where: { id } });
    }
  }
}
