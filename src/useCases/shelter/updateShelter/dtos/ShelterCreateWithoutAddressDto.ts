import { OmitType } from '@nestjs/mapped-types';
import { CreateShelterControllerDto } from '../../createShelter/dtos/CreateShelter.controller.dto';

export class ShelterCreateWithoutAddressDto extends OmitType(CreateShelterControllerDto, [
  'address',
]) {}
