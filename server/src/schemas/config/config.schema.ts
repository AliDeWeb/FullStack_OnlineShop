import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConfigDocument = HydratedDocument<Config>;

@Schema({ timestamps: true })
export class Config {
  @Prop({ type: String, required: true, unique: true })
  key: string;

  @Prop({ type: String, required: true })
  value: string;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);

// Indexes
ConfigSchema.index({ key: 1 }, { unique: true });
