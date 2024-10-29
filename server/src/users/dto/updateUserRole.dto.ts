import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { userRolesType } from 'src/utilities/types/userRoles.type';

export class updateUserRoleDto {
  @IsString({ message: 'invalid role' })
  @ApiProperty({ example: 'admin', default: 'user' })
  role: userRolesType;
}
