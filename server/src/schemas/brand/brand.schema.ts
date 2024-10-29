import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Category } from '../category/category.schema';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true })
export class Brand {
  @Prop({
    type: String,
    required: [true, 'provide a title for category'],
    unique: true,
  })
  title: string;

  @Prop({ type: [mongooseSchema.Types.ObjectId], ref: Category.name })
  allowedCategories?: mongooseSchema.Types.ObjectId[];

  @Prop({ type: String })
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

// Indexes
BrandSchema.index({ title: 1 }, { unique: true });
