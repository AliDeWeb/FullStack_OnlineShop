import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Schema as mongooseSchema } from 'mongoose';
import {
  orderStatusEnum,
  orderStatusType,
} from '../../utilities/types/ordersStatus.type';
import { User } from '../user/user.schema';
import { ProductModel } from '../productModel/productModel.schema';
import { Product } from '../product/product.schema';
import { Address } from '../address/address.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class OrderProduct {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  productID: mongooseSchema.Types.ObjectId;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: ProductModel.name,
    required: true,
  })
  productModelsID: mongooseSchema.Types.ObjectId;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    required: true,
  })
  productModelID: mongooseSchema.Types.ObjectId;

  @Prop({ type: Number, required: true })
  count: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: String, default: 'payment', enum: orderStatusEnum })
  status: orderStatusType;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: User.name, required: true })
  user: mongooseSchema.Types.ObjectId;

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ type: Number, required: true })
  totalPriceWithNoDiscount: number;

  @Prop({ type: Number })
  transportCost: number;

  @Prop({ type: { code: String, discount: Number } })
  discountCode: { code: string; discount: number };

  @Prop({ type: [OrderProduct], required: true })
  products: OrderProduct[];

  @Prop({ type: String })
  paySlips: string;

  @Prop({ type: String })
  authority: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: Address.name })
  address: mongooseSchema.Types.ObjectId;

  @Prop({ type: Number })
  orderId: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

function generateRandomOrderId() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Middlewares
OrderSchema.pre<OrderDocument>('save', async function (next) {
  const OrderModel = this.constructor as Model<OrderDocument>;

  if (!this.orderId) {
    let unique = false;
    while (!unique) {
      const randomId = generateRandomOrderId();
      const existingOrder = await OrderModel.findOne({ orderId: randomId });
      if (!existingOrder) {
        this.orderId = randomId;
        unique = true;
      }
    }
  }
  next();
});
