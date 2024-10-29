import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Schema } from 'mongoose';
import { Address, AddressDocument } from 'src/schemas/address/address.schema';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';

@Injectable()
export class AddressesRepository {
  constructor(
    @InjectModel(Address.name)
    private readonly AddressModel: Model<AddressDocument>,
  ) {}

  async createAddress(
    addressData: CreateAddressDto & { user: Schema.Types.ObjectId },
  ) {
    return await this.AddressModel.create(addressData);
  }

  async updateAddress(
    UpdateAddressDto: UpdateAddressDto,
    addressId: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
  ) {
    return await this.AddressModel.findOneAndUpdate(
      { _id: addressId, user },
      UpdateAddressDto,
      {
        new: true,
      },
    ).exec();
  }

  async deleteAddress(
    addressId: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
  ) {
    return await this.AddressModel.findOneAndDelete({
      _id: addressId,
      user,
    }).exec();
  }

  async getUserAddresses(user: Schema.Types.ObjectId) {
    return await this.AddressModel.find({ user }).select('-user').exec();
  }

  async findAddressesByFilter(filters: PipelineStage[]) {
    return await this.AddressModel.aggregate(filters).exec();
  }
}
