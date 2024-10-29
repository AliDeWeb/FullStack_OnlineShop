import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as mongooseSchema } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: String, required: [true, 'message is required'] })
  message: string;

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
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
