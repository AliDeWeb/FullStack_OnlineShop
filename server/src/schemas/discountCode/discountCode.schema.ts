import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as mongooseSchema } from 'mongoose';

export type DiscountCodeDocument = HydratedDocument<DiscountCode>;

@Schema({ timestamps: true })
export class DiscountCode {
  @Prop({
    type: String,
    unique: true,
    required: [true, 'discountCode is required'],
  })
  discountCode: string;

  @Prop({
    type: [mongooseSchema.Types.Mixed],
    default: ['all'],
    validate: {
      validator: function (value: any[]) {
        return value.every(
          (item) => item === 'all' || mongoose.Types.ObjectId.isValid(item),
        );
      },
      message: () => `Invalid value in 'users' array`,
    },
  })
  users: mongooseSchema.Types.ObjectId[];

  @Prop({
    type: Number,
    required: [true, 'discountPercent is required'],
  })
  discountPercent: number;

  @Prop({ type: Boolean, default: true })
  firstOrder?: boolean;

  @Prop({
    type: Date,
    required: true,
  })
  expiresIn: Date;

  @Prop({ type: Number, required: true })
  maximumUsedCount: number;

  @Prop({ type: Number, default: 0 })
  usedCount: number;

  @Prop({ type: Number, required: true })
  maximumPrice: number;
}

export const DiscountCodeSchema = SchemaFactory.createForClass(DiscountCode);

// Indexes
DiscountCodeSchema.index({ discountCode: 1 }, { unique: true });
