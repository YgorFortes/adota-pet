import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/infra/db/entities/Address.entity';
import { CreateAddressModule } from './createAddress/createArdress.module';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), AddressEntity, CreateAddressModule],
  exports: [CreateAddressModule],
})
export class AddressModule {}
