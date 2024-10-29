import { Module } from '@nestjs/common';
import { CoversService } from './covers.service';
import { CoversController } from './covers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cover, CoverSchema } from '../schemas/cover/cover.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CoversRepository } from './covers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cover.name, schema: CoverSchema }]),
    AuthModule,
    UsersModule,
  ],
  controllers: [CoversController],
  providers: [CoversService, CoversRepository],
})
export class CoversModule {}
