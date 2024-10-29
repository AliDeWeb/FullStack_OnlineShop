import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Product } from '../product/product.schema';
import { Category } from '../category/category.schema';

export type ProductModelDocument = HydratedDocument<ProductModel>;

@Schema()
export class ProductModel {
  @Prop({
    type: [
      {
        price: { type: Number, required: [true, 'price is required'] },
        count: { type: Number, required: [true, 'count is required'] },
        discount: { type: Number },
        additionalFields: { type: mongooseSchema.Types.Mixed },
      },
    ],
    required: true,
  })
  productModels: {
    _id: mongooseSchema.Types.ObjectId;
    price: number;
    count: number;
    discount?: number;
    additionalFields?: Record<string, string>;
  }[];

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: Product.name,
    required: true,
    unique: true,
  })
  product: mongooseSchema.Types.ObjectId;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: mongooseSchema.Types.ObjectId;
}

export const ProductModelSchema = SchemaFactory.createForClass(ProductModel);

// Indexes
ProductModelSchema.index({ product: 1 }, { unique: true });
