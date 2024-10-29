import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../schemas/order/order.schema';
import { Model, PipelineStage, Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { orderStatusType } from '../utilities/types/ordersStatus.type';
import { OrderDto } from './dto/order.dto';
import ApiFeatures from '../utilities/apis/apiFeatures';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private readonly OrderModel: Model<OrderDocument>,
  ) {}

  async createCart(OrderDto: {
    user: Schema.Types.ObjectId;
    totalPrice: number;
    transportCost: number;
    products: OrderDto[];
    totalPriceWithNoDiscount: number;
  }) {
    return await this.OrderModel.create(OrderDto);
  }

  async updateCart(
    OrderDto: OrderDto,
    orderId: Schema.Types.ObjectId,
    totalPrice: number,
    transportCost: number,
    totalPriceWithNoDiscount: number,
  ) {
    return await this.OrderModel.findByIdAndUpdate(
      orderId,
      {
        totalPrice,
        transportCost,
        $push: { products: OrderDto },
        totalPriceWithNoDiscount,
      },
      { new: true },
    ).exec();
  }

  async updateOrderStatus(id: Schema.Types.ObjectId, status: orderStatusType) {
    return await this.OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).exec();
  }

  async findOrderById(id: Schema.Types.ObjectId) {
    return await this.OrderModel.findById(id).exec();
  }

  async deleteOrder(user: Schema.Types.ObjectId) {
    return await this.OrderModel.findOneAndDelete(
      { user, status: 'payment' },
      { new: true },
    ).exec();
  }

  async findUserCart(user: Schema.Types.ObjectId): Promise<any> {
    return await this.OrderModel.findOne({ user, status: 'payment' })
      .populate({
        path: 'products.productID',
        select: 'title description images category brand',
        populate: { path: 'brand', select: 'title image' },
      })
      .populate({
        path: 'products.productModelsID',
      })
      .exec();
  }

  async findOrderByUserAndProduct(
    userId: Schema.Types.ObjectId,
    productID: Schema.Types.ObjectId,
  ) {
    return await this.OrderModel.findOne({
      user: userId,
      status: 'sent',
      products: {
        $elemMatch: {
          productID,
        },
      },
    }).exec();
  }

  async findProductInOrderProducts(
    user: Schema.Types.ObjectId,
    productID: Schema.Types.ObjectId,
    productModelID: Schema.Types.ObjectId,
  ) {
    return await this.OrderModel.findOne(
      {
        user,
        status: 'payment',
        'products.productModelID': productModelID,
        'products.productID': productID,
      },
      {
        'products.$': 1,
      },
    ).exec();
  }

  async updateProductInOrderProducts(
    user: Schema.Types.ObjectId,
    id: Schema.Types.ObjectId,
    count: number,
    totalPrice: number,
    transportCost: number,
    totalPriceWithNoDiscount: number,
  ) {
    return await this.OrderModel.findOneAndUpdate(
      {
        user,
        status: 'payment',
        'products._id': id,
      },
      {
        $set: {
          totalPrice,
          transportCost,
          'products.$.count': count,
          totalPriceWithNoDiscount,
        },
      },
      {
        new: true,
      },
    ).exec();
  }

  async addDiscountCodeAndUpdateTotalPrice(
    discountCode: {
      code: string;
      discount: number;
    },
    totalPrice: number,
    orderId: Schema.Types.ObjectId,
  ) {
    return await this.OrderModel.findByIdAndUpdate(
      orderId,
      {
        totalPrice,
        discountCode,
      },
      { new: true },
    ).exec();
  }

  async getUserOrders(user: Schema.Types.ObjectId) {
    return this.OrderModel.find({
      $and: [
        {
          status: { $ne: 'payment' },
        },
        { user },
      ],
    })
      .sort('-createdAt')
      .populate({
        path: 'products.productID',
        select: 'title description images category brand',
        populate: { path: 'brand', select: 'title image' },
      })
      .populate({
        path: 'products.productModelsID',
      })
      .populate({ path: 'address', select: 'address _id' });
  }

  async getOrdersByFilter(filters: PipelineStage[]) {
    return await this.OrderModel.aggregate(filters).exec();
  }

  async findOrderByAuthorityAndUser(
    userId: Schema.Types.ObjectId,
    authority: string,
  ) {
    return await this.OrderModel.find({
      user: userId,
      authority,
      status: 'pending',
    })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getAllOrders(queryObj: any) {
    const query = new ApiFeatures(
      this.OrderModel.find({ status: { $ne: 'payment' } })
        .populate({
          path: 'products.productID',
          select: 'title description images category brand',
          populate: [
            { path: 'brand', select: 'title image' },
            { path: 'category', select: 'title image' },
          ],
        })
        .populate({
          path: 'products.productModelsID',
        })
        .populate({
          path: 'user',
          select:
            '-__v -password -createdAt -isBanned -updatedAt -passwordUpdatedAt',
        })
        .populate({ path: 'address', select: 'address _id' }),
      queryObj,
    )
      .filter()
      .sort()
      .fields()
      .paginate()
      .getQuery();

    return await query;
  }

  async deleteProductFromOrder(
    cartId: Schema.Types.ObjectId,
    productId: Schema.Types.ObjectId,
  ) {
    return this.OrderModel.findOneAndUpdate(
      { _id: cartId },
      { $pull: { products: { _id: productId } } },
      { new: true },
    ).exec();
  }
}
