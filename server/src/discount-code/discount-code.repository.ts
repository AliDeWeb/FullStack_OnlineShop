import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import {
  DiscountCode,
  DiscountCodeDocument,
} from 'src/schemas/discountCode/discountCode.schema';
import { CreateDiscountCodeDto } from './dto/createDiscountCode.dto';
import { UpdateDiscountCodeDto } from './dto/updateDiscountCode.dto';

export class DiscountCodeRepository {
  constructor(
    @InjectModel(DiscountCode.name)
    private readonly DiscountCodeModel: Model<DiscountCodeDocument>,
  ) {}

  async createDiscountCode(CreateDiscountCodeDto: CreateDiscountCodeDto) {
    return await this.DiscountCodeModel.create(CreateDiscountCodeDto);
  }

  async updateDiscountCode(
    UpdateDiscountCodeDto: UpdateDiscountCodeDto,
    codeId: Schema.Types.ObjectId,
  ) {
    return await this.DiscountCodeModel.findByIdAndUpdate(
      codeId,
      UpdateDiscountCodeDto,
      { new: true },
    ).exec();
  }

  async updateDiscountCodeUserCountByCode(discountCode: string) {
    return await this.DiscountCodeModel.findOneAndUpdate(
      { discountCode },
      { $inc: { usedCount: 1 } },
      { new: true },
    ).exec();
  }

  async getAllDiscountCodes() {
    return this.DiscountCodeModel.find();
  }

  async deleteDiscountCode(codeId: Schema.Types.ObjectId) {
    return await this.DiscountCodeModel.findByIdAndDelete(codeId).exec();
  }

  async findDiscountCodeByCode(discountCode: string) {
    return this.DiscountCodeModel.findOne({ discountCode });
  }
}
