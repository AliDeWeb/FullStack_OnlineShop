import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigsController } from './configs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, ConfigSchema } from '../schemas/config/config.schema';
import { ConfigsRepository } from './configs.repository';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }]),
    AuthModule,
    UsersModule,
  ],
  controllers: [ConfigsController],
  providers: [ConfigsService, ConfigsRepository],
  exports: [ConfigsService],
})
export class ConfigsModule {}
