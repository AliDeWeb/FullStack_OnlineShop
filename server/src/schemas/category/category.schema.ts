import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from '../product/product.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class ProductVariantsSchema {
  @Prop({ type: String, required: true })
  variantName: string;

  @Prop({ type: [String] })
  variantOptions: string[];

  @Prop({ type: Boolean })
  optional: boolean;
}

@Schema()
export class Category {
  @Prop({
    type: String,
    required: [true, 'provide a title for category'],
    unique: true,
  })
  title: string;

  @Prop({ type: [ProductVariantsSchema] })
  productVariantsSchema: ProductVariantsSchema[];

  @Prop({ type: String })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Indexes
CategorySchema.index({ title: 1 }, { unique: true });

// Virtual Properties
CategorySchema.set('toJSON', { virtuals: true });
CategorySchema.set('toObject', { virtuals: true });

CategorySchema.virtual('products', {
  ref: () => Product.name,
  localField: '_id',
  foreignField: 'category',
});
