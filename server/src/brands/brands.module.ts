import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { BrandsRepository } from './brands.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from 'src/schemas/brand/brand.schema';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    UsersModule,
    AuthModule,
  ],
  controllers: [BrandsController],
  providers: [BrandsService, BrandsRepository],
  exports: [BrandsService],
})
export class BrandsModule {}
