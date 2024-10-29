import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Category } from '../category/category.schema';
import { Comment } from '../comment/comment.schema';
import { Brand } from '../brand/brand.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: [true, 'the product must have a title'] })
  title: string;

  @Prop({
    type: String,
    required: [true, 'the product must have description'],
  })
  description: string;

  @Prop({
    type: [String],
    required: [true, 'the product must have a image'],
  })
  images: string[];

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: Category.name,
    required: [true, 'the product must have category'],
  })
  category: mongooseSchema.Types.ObjectId;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: Brand.name,
  })
  brand?: mongooseSchema.Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  sold: number;

  @Prop({ type: Number, default: 0 })
  view: number;

  @Prop({
    type: [
      {
        name: { type: String, required: [true, 'name is required'] },
        value: { type: String, required: [true, 'value is required'] },
        description: String,
      },
    ],
  })
  details: { name: string; value: string; description?: string }[];

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Virtual
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });
ProductSchema.virtual<ProductDocument>('comments', {
  ref: Comment.name,
  localField: '_id',
  foreignField: 'product',
});
ProductSchema.virtual<ProductDocument>('models', {
  ref: 'ProductModel',
  localField: '_id',
  foreignField: 'product',
});
