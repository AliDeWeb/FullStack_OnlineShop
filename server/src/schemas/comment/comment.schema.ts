import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class CommentResponse {
  @Prop({ type: String })
  response: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User' })
  user: mongooseSchema.Types.ObjectId;
}

@Schema({ timestamps: true })
export class Comment {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user is required'],
  })
  user: mongooseSchema.Types.ObjectId;

  @Prop({
    type: Boolean,
    default: false,
  })
  isBuyer: boolean;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'product is required'],
  })
  product: mongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: [true, 'message is required'] })
  message: string;

  @Prop({ type: Number, required: [true, 'rate is required'] })
  rate: number;

  @Prop({ type: [CommentResponse] })
  responses: CommentResponse[];

  @Prop({ type: Boolean, default: false })
  isAccepted: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
