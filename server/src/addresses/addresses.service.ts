import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UsersService } from '../users/users.service';
import { PipelineStage, Schema } from 'mongoose';
import { UpdateAddressDto } from './dto/updateAddress.dto';

@Injectable()
export class AddressesService {
  constructor(
    private readonly AddressesRepository: AddressesRepository,
    private readonly UsersService: UsersService,
  ) {}

  async createAddress(
    addressData: CreateAddressDto & { user: Schema.Types.ObjectId },
  ) {
    const user = await this.UsersService.findUserById(addressData.user);

    if (!user) throw new NotFoundException('user not found');

    return await this.AddressesRepository.createAddress(addressData);
  }

  async updateAddress(
    addressData: UpdateAddressDto,
    user: Schema.Types.ObjectId,
    addressId: Schema.Types.ObjectId,
  ) {
    const updatedAddress = await this.AddressesRepository.updateAddress(
      addressData,
      addressId,
      user,
    );

    if (!updatedAddress) throw new NotFoundException('address not found');

    return updatedAddress;
  }

  async deleteAddress(
    addressId: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
  ) {
    const deletedAddress = await this.AddressesRepository.deleteAddress(
      addressId,
      user,
    );

    if (!deletedAddress) throw new NotFoundException('address not found');

    return deletedAddress;
  }

  async getUserAddresses(user: Schema.Types.ObjectId) {
    return await this.AddressesRepository.getUserAddresses(user);
  }

  async findAddressesByFilter(filters: PipelineStage[]) {
    return await this.AddressesRepository.findAddressesByFilter(filters);
  }
}
