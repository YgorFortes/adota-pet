import { OmitType } from '@nestjs/mapped-types';
import { CreateGuardianCrontollerDto } from '../../createGuardian/dtos/CreateGuardian.controller.dto';

export class GuardianCreationWithoutAddressDto extends OmitType(CreateGuardianCrontollerDto, [
  'address',
]) {}
