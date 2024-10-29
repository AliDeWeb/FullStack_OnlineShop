import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Schema } from 'mongoose';
import {
  ProductModel as ProductModelSchema,
  ProductModelDocument,
} from 'src/schemas/productModel/productModel.schema';
import { ProductModelDto } from './dto/productModelsDto';

@Injectable()
export class ProductModelsRepository {
  constructor(
    @InjectModel(ProductModelSchema.name)
    private readonly ProductModelsModel: Model<ProductModelDocument>,
  ) {}

  async createProductModel(CreateProductModelDto: ProductModelDto) {
    return await this.ProductModelsModel.create(CreateProductModelDto);
  }

  async updateProductModel(
    modelsId: Schema.Types.ObjectId,
    modelId: Schema.Types.ObjectId,
    updateProductModelDto: ProductModelDto,
  ) {
    return await this.ProductModelsModel.updateOne(
      {
        _id: modelsId,
        'productModels._id': modelId,
      },
      {
        $set: { 'productModels.$': updateProductModelDto },
      },
    ).exec();
  }

  async findProductModelsById(id: Schema.Types.ObjectId) {
    return await this.ProductModelsModel.findById(id).exec();
  }

  async findProductModel(
    productModelsId: Schema.Types.ObjectId,
    productModelId: Schema.Types.ObjectId,
  ) {
    return await this.ProductModelsModel.findOne(
      {
        _id: productModelsId,
        'productModels._id': productModelId,
      },
      {
        'productModels.$': 1,
      },
    ).exec();
  }

  async deleteProductModelById(id: Schema.Types.ObjectId) {
    return await this.ProductModelsModel.findByIdAndDelete(id).exec();
  }

  async decreaseProductCountByItemId(
    productModelId: Schema.Types.ObjectId,
    itemId: Schema.Types.ObjectId,
    decreaseAmount: number,
  ): Promise<void> {
    await this.ProductModelsModel.updateOne(
      { _id: productModelId, 'productModels._id': itemId },
      {
        $inc: { 'productModels.$.count': -decreaseAmount },
      },
    );
  }

  async findModelsByFilter(filters: PipelineStage[]) {
    return this.ProductModelsModel.aggregate(filters).exec();
  }
}
