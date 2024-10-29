import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsletterDocument = HydratedDocument<Newsletter>;

@Schema()
export class Newsletter {
  @Prop({
    type: String,
    required: [true, 'provide a valid email'],
    unique: true,
  })
  email: string;
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);

// Indexes
NewsletterSchema.index({ email: 1 }, { unique: true });
