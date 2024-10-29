import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: mongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: true })
  address: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
