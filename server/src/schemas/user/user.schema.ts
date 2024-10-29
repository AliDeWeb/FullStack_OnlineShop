import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
  userRolesEnum,
  userRolesType,
} from 'src/utilities/types/userRoles.type';
import { Address } from '../address/address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, default: 'user', enum: userRolesEnum })
  role: userRolesType;

  @Prop({ type: String, required: 'password is required' })
  password: string;

  @Prop({ type: Date })
  passwordUpdatedAt: Date;

  @Prop({
    type: String,
    unique: true,
    required: [true, 'phone number is required'],
    trim: true,
  })
  phoneNumber: string;

  @Prop({ type: String, trim: true, lowercase: true, required: true })
  name: string;

  @Prop({
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({ type: Number, default: 0 })
  isBanned: 0 | 1;

  @Prop({
    type: { code: Number, expires: Date },
    default: {
      code: 0,

      expires: new Date(new Date().getTime() - 10 * 60 * 100000000),
    },
  })
  loginCode: { code: number; expires: Date };
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middlewares
UserSchema.pre<UserDocument>(`save`, async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordUpdatedAt = new Date(Date.now());
  }

  next();
});

// Indexes
UserSchema.index({ phoneNumber: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

// Virtual Properties
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

// Virtual
UserSchema.virtual<UserDocument>('addresses', {
  ref: () => Address.name,
  localField: '_id',
  foreignField: 'user',
});
