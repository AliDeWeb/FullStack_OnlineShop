import { SetMetadata } from '@nestjs/common';
import { userRolesType } from 'src/utilities/types/userRoles.type';

export const Roles = (...roles: userRolesType[]) => SetMetadata('roles', roles);
