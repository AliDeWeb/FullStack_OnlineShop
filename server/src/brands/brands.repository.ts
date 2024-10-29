import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Brand, BrandDocument } from 'src/schemas/brand/brand.schema';
import { BrandDto } from './dto/brand.dto';

@Injectable()
export class BrandsRepository {
  constructor(
    @InjectModel(Brand.name) private readonly BrandModel: Model<BrandDocument>,
  ) {}

  async createBrand(brandData: BrandDto, imageUrl: string) {
    return await this.BrandModel.create({ ...brandData, image: imageUrl });
  }

  async findBrandById(brandId: Schema.Types.ObjectId) {
    return this.BrandModel.findById(brandId);
  }

  async findBrandByTitle(brandTitle: string) {
    return this.BrandModel.findOne({ title: brandTitle });
  }

  async getAllBrands() {
    return this.BrandModel.find();
  }

  async updateBrand(
    brandId: Schema.Types.ObjectId,
    brandData: BrandDto & { image?: string },
  ) {
    return await this.BrandModel.findByIdAndUpdate(brandId, brandData).exec();
  }

  async deleteBrand(brandId: Schema.Types.ObjectId) {
    return await this.BrandModel.findByIdAndDelete(brandId).exec();
  }
}
