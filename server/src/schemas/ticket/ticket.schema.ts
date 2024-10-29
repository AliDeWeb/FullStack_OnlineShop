import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';

export type TicketDocument = HydratedDocument<Ticket>;

interface ticketMessages {
  message: string;
  date: Date;
}

@Schema()
export class TicketMessages {
  @Prop({
    type: String,
    required: [true, 'message is required to create a new ticket'],
  })
  message: string;

  @Prop({ type: Date, default: Date.now() })
  Date: Date;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: User.name })
  admin: mongooseSchema.Types.ObjectId;
}

@Schema({ timestamps: true })
export class Ticket {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: User.name,
    required: [true, 'user is required to create a new ticket'],
  })
  user: mongooseSchema.Types.ObjectId;

  @Prop({ type: [TicketMessages] })
  messages: ticketMessages[];

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
