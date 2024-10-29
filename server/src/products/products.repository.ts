import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Schema } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product/product.schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import ApiFeatures from 'src/utilities/apis/apiFeatures';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(productData: CreateProductDto): Promise<Product> {
    return await this.productModel.create(productData);
  }

  async updateProduct(
    id: Schema.Types.ObjectId,
    productData: UpdateProductDto,
    images: string[],
  ): Promise<Product | null> {
    return await this.productModel
      .findByIdAndUpdate(
        id,
        { ...productData, $push: { images } },
        { new: true },
      )
      .exec();
  }

  async deleteProductImages(id: Schema.Types.ObjectId, imagesUrl: string[]) {
    return await this.productModel
      .findByIdAndUpdate(
        id,
        { $pull: { images: { $in: imagesUrl } } },
        { new: true },
      )
      .exec();
  }

  async updateProductsView(id: Schema.Types.ObjectId) {
    await this.productModel.findByIdAndUpdate(id, { $inc: { view: 1 } });
  }

  async updateProductsSold(ids: Schema.Types.ObjectId[]) {
    return await this.productModel
      .updateMany({ _id: { $in: ids } }, { $inc: { sold: 1 } })
      .exec();
  }

  async deleteProduct(id: Schema.Types.ObjectId): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id).exec();
  }

  async findAllProducts(queryObj: any): Promise<Product | null> {
    const query = new ApiFeatures(
      this.productModel.find({ isActive: true }).populate('models'),
      queryObj,
    )
      .filter()
      .search()
      .sort()
      .fields()
      .paginate()
      .getQuery();

    return await query;
  }

  async findProductById(id: Schema.Types.ObjectId): Promise<Product | null> {
    return await this.productModel
      .findById(id)
      .select('-view -sold')
      .populate({
        path: 'category',
        select: 'title _id',
      })
      .populate({
        path: 'brand',
        select: 'title _id',
      })
      .populate({
        path: 'comments',
        match: { isAccepted: { $eq: true } },
        select: '-__v -isAccepted -updatedAt',
        populate: {
          path: 'user',
          select: '-__v -password -phoneNumber -createdAt -updatedAt',
        },
      })
      .populate({
        path: 'models',
      })
      .select('-__v')
      .exec();
  }

  async findProductByIdWithoutPopulate(
    id: Schema.Types.ObjectId,
  ): Promise<Product | null> {
    return await this.productModel
      .findById(id)
      .select('-view -sold')

      .select('-__v')
      .exec();
  }

  async findProductsByFilter(filters: PipelineStage[]) {
    return await this.productModel.aggregate(filters).exec();
  }

  async changeProductActiveStatus(
    isActive: boolean,
    id: Schema.Types.ObjectId,
  ) {
    return await this.productModel
      .findByIdAndUpdate(id, { isActive }, { new: true })
      .exec();
  }
}
