import { PartialType } from '@nestjs/mapped-types';
import { UserCreationWithoutRoleDto } from './UserCreationWithoutRole.dto';

export class UpdateUserControlleDto extends PartialType(UserCreationWithoutRoleDto) {}
