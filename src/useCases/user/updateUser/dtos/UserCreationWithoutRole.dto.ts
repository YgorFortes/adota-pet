import { OmitType } from '@nestjs/mapped-types';
import { CreateUserControllerDto } from '../../createUser/dtos/CreateUser.controller.dto';

export class UserCreationWithoutRoleDto extends OmitType(CreateUserControllerDto, ['role']) {}
