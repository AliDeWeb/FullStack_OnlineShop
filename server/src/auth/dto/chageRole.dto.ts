import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { userRolesType } from 'src/utilities/types/userRoles.type';

export class changeRoleDto {
  @IsString({ message: 'role must be string' })
  @ApiProperty({
    name: 'role',
    example: 'admin',
  })
  role: userRolesType;
}
