import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { AddressesRepository } from './addresses.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from 'src/schemas/address/address.schema';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    UsersModule,
    AuthModule,
  ],
  controllers: [AddressesController],
  providers: [AddressesService, AddressesRepository],
  exports: [AddressesService],
})
export class AddressesModule {}
