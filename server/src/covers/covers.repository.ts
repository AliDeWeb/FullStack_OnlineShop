import { Injectable } from '@nestjs/common';
import { CreateCoverDto } from './dto/create-cover.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cover, CoverDocument } from '../schemas/cover/cover.schema';
import { Model, Schema } from 'mongoose';

@Injectable()
export class CoversRepository {
  constructor(
    @InjectModel(Cover.name) private readonly CoverModel: Model<CoverDocument>,
  ) {}

  async createCover(data: CreateCoverDto) {
    return await this.CoverModel.create(data);
  }

  async getAllCovers() {
    return await this.CoverModel.aggregate([
      {
        $sort: { priority: 1 },
      },
      {
        $project: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
      {
        $group: {
          _id: '$device',
          data: { $push: '$$ROOT' },
        },
      },
    ]);
  }

  async getCoverById(id: Schema.Types.ObjectId) {
    return await this.CoverModel.findById(id).exec();
  }

  async deleteCover(id: Schema.Types.ObjectId) {
    return await this.CoverModel.findByIdAndDelete(id).exec();
  }
}
