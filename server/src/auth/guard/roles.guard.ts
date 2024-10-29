import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { userRolesType } from 'src/utilities/types/userRoles.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly UsersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<userRolesType[]>(
      'roles',
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();

    if (!req?.user)
      throw new ForbiddenException(
        'you do not have permission to do this action',
      );

    const user = await this.UsersService.findUserById(req?.user.id);

    const hasUserPermission = roles.includes(user.role);

    if (!hasUserPermission)
      throw new ForbiddenException(
        'you do not have permission to do this action',
      );

    return true;
  }
}
