import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProtectedRouteGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly UsersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const authorization = req.headers.authorization;

    if (!authorization?.startsWith('Bearer'))
      throw new ForbiddenException('invalid token');

    const token = authorization?.split(' ')[1];

    if (!token) throw new ForbiddenException('invalid token');

    try {
      const payload = await this.JwtService.verifyAsync(token);

      const user = await this.UsersService.findUserByIdForAuth(payload.id);

      if (user?.isBanned)
        throw new ForbiddenException('you have already banned');

      if (
        Math.floor(new Date(user.passwordUpdatedAt).getTime() / 1000) >
        payload.iat
      )
        throw new ForbiddenException('invalid token');

      req.user = payload;

      return true;
    } catch (err) {
      throw new ForbiddenException('invalid token');
    }
  }
}
