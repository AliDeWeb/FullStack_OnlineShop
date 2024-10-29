import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoverDocument = HydratedDocument<Cover>;

@Schema({ timestamps: true })
export class Cover {
  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: true, type: Number })
  priority: number;

  @Prop({ required: true, type: String, enum: ['desktop', 'mobile', 'both'] })
  device: 'desktop' | 'mobile' | 'both';
}

export const CoverSchema = SchemaFactory.createForClass(Cover);
