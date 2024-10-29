import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { userRolesType } from 'src/utilities/types/userRoles.type';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async resetPassword(
    ResetPasswordDto: ResetPasswordDto,
    userId: Schema.Types.ObjectId,
  ) {
    const user = await this.userModel.findById(userId);

    user.password = ResetPasswordDto.password;

    return await user.save({ validateBeforeSave: false });
  }

  async changeRole(id: Schema.Types.ObjectId, role: userRolesType) {
    return await this.userModel.findByIdAndUpdate(id, { role }).exec();
  }

  async findUserByPhoneNumber(phoneNumber: string) {
    return await this.userModel.findOne({ phoneNumber }).exec();
  }
}
