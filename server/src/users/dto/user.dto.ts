import { Expose } from 'class-transformer';
import { userRolesType } from 'src/utilities/types/userRoles.type';

export class UserDto {
  @Expose()
  phoneNumber: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: userRolesType;

  @Expose()
  createdAt: Date;
}
