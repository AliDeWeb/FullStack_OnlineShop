import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Schema } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schema';
import ApiFeatures from 'src/utilities/apis/apiFeatures';
import { userRolesType } from 'src/utilities/types/userRoles.type';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findUserById(id: Schema.Types.ObjectId): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async findUserByIdForAuth(id: Schema.Types.ObjectId): Promise<User | null> {
    return this.userModel.findById(id).select('_id');
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.userModel.findOne({ phoneNumber }).populate('addresses');
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({ email })
      .populate('addresses')
      .select('-password -passwordUpdatedAt');
  }

  async updateUserById(
    id: Schema.Types.ObjectId,
    attrs: Partial<User>,
  ): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, attrs, { new: true }).exec();
  }

  async updateUserRole(phoneNumber: string, role: userRolesType) {
    return this.userModel.findOneAndUpdate(
      { phoneNumber },
      { role },
      { new: true },
    );
  }

  async getAllUsers(query: any) {
    return await new ApiFeatures(
      this.userModel.find().populate('addresses'),
      query,
    )
      .filter()
      .fields()
      .sort()
      .paginate()
      .getQuery();
  }

  async getUsersByFilter(filter: PipelineStage[]) {
    return await this.userModel.aggregate(filter).exec();
  }

  async banAndUnBanUser(user: Schema.Types.ObjectId) {
    return await this.userModel
      .findByIdAndUpdate(
        user,
        { $bit: { isBanned: { xor: 1 } } },
        { new: true },
      )
      .exec();
  }
}
