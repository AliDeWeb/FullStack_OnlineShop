import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user/user.schema';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UserRepository, ProtectedRouteGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
