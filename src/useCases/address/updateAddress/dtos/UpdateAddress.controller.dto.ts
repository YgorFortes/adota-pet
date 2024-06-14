import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressControllerDto } from '../../createAddress/dtos/CreateAddress.controller.dto';

export class UpdateAddressControllerDto extends PartialType(CreateAddressControllerDto) {}
