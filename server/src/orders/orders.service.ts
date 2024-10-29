import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Schema } from 'mongoose';
import { ProductModelsService } from '../product-models/product-models.service';
import { orderStatusType } from '../utilities/types/ordersStatus.type';
import { ProductsService } from '../products/products.service';
import { OrderDocument } from '../schemas/order/order.schema';
import { ConfigsService } from '../configs/configs.service';
import { OrderDto } from './dto/order.dto';
import { DiscountCodeService } from 'src/discount-code/discount-code.service';
import { timeFrameDto } from '../utilities/publicDto/timeFrame.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly OrdersRepository: OrdersRepository,
    private readonly ProductModelsService: ProductModelsService,
    private readonly ProductsService: ProductsService,
    private readonly ConfigsService: ConfigsService,
    private readonly DiscountCodeService: DiscountCodeService,
    private readonly UserService: UsersService,
  ) {}

  private async checkIfThereIsEnoughProduct(order: OrderDocument) {
    for (const item of order.products) {
      const productModel =
        await this.ProductModelsService.findProductModelsById(
          item.productModelsID,
        );

      const model = productModel.productModels.find((el: any) => {
        return el._id.toString() === item.productModelID.toString();
      });

      if (model.count < item.count)
        throw new BadRequestException(
          'unfortunately there is not enough product, please contact with support team',
        );
    }
  }

  async updateOrderStatus(id: Schema.Types.ObjectId, status: orderStatusType) {
    const orderPreUpdate = await this.OrdersRepository.findOrderById(id);

    if (status !== 'review') {
      const order = await this.OrdersRepository.updateOrderStatus(id, status);

      if (!order) throw new NotFoundException('order not found');
    }

    await this.checkIfThereIsEnoughProduct(orderPreUpdate);

    const order = await this.OrdersRepository.updateOrderStatus(id, status);

    if (status === 'review') {
      order?.discountCode &&
        (await this.DiscountCodeService.updateDiscountCodeUserCountByCode(
          order.discountCode.code,
        ));

      const productIds: Schema.Types.ObjectId[] = [];

      for (const item of order.products) {
        productIds.push(item.productID);

        await this.ProductModelsService.decreaseProductCountByItemId(
          item.productModelsID,
          item.productModelID,
          item.count,
        );
      }

      await this.ProductsService.updateProductsSold(productIds);

      const users =
        await this.UserService.findOwnerAndAdminsAndUserPhoneNumbers(
          order.user,
        );
      const user = await this.UserService.findUserById(order.user);
      users.push({ phoneNumber: user.phoneNumber, name: user?.name });
    }

    if (status === 'sending') {
      await this.UserService.findUserById(order.user);

      order.status = 'sent';
      await order.save();
    }

    return order;
  }

  async updateUserCart(OrderDto: OrderDto, user: Schema.Types.ObjectId) {
    const userCart = await this.OrdersRepository.findUserCart(user);

    const transportCost = Number(
      (await this.ConfigsService.findConfigByKey('transportCost')).value,
    );
    const transportMinimumFreeCost = Number(
      (await this.ConfigsService.findConfigByKey('transportMinimumFreeCost'))
        .value,
    );

    if (!userCart) {
      if (OrderDto.count <= 0)
        throw new BadRequestException('invalid product count');

      const productModel = await this.ProductModelsService.findProductModel(
        OrderDto.productModelsID,
        OrderDto.productModelID,
      );

      if (!productModel) throw new NotFoundException('product not found');

      const orders = { products: [OrderDto] };

      await this.checkIfThereIsEnoughProduct(orders as any);

      const products = [OrderDto];

      let totalPrice = productModel.productModels[0].discount
        ? ((productModel.productModels[0].price *
            (100 - productModel.productModels[0].discount)) /
            100) *
          OrderDto.count
        : productModel.productModels[0].price * OrderDto.count;

      const totalPriceWithNoDiscount =
        productModel.productModels[0].price * OrderDto.count;

      let orderTransportCost = 0;
      if (totalPrice < transportMinimumFreeCost) {
        totalPrice += transportCost;
        orderTransportCost = transportCost;
      }

      const cart = await this.OrdersRepository.createCart({
        user,
        products,
        totalPrice,
        transportCost: orderTransportCost,
        totalPriceWithNoDiscount,
      });

      return cart;
    } else {
      const productModel = await this.ProductModelsService.findProductModel(
        OrderDto.productModelsID,
        OrderDto.productModelID,
      );

      if (!productModel) throw new NotFoundException('product not found');

      const isProductExistInCard =
        await this.OrdersRepository.findProductInOrderProducts(
          user,
          OrderDto.productID,
          OrderDto.productModelID,
        );

      if (!isProductExistInCard) {
        if (OrderDto.count < 0)
          throw new BadRequestException('invalid product count');

        const orders = { products: [OrderDto] };

        await this.checkIfThereIsEnoughProduct(orders as any);

        let totalPrice = productModel.productModels[0].discount
          ? ((productModel.productModels[0].price *
              (100 - productModel.productModels[0].discount)) /
              100) *
            OrderDto.count
          : productModel.productModels[0].price * OrderDto.count;
        let totalPriceWithNoDiscount =
          productModel.productModels[0].price * OrderDto.count;

        totalPrice += userCart.totalPrice;
        totalPriceWithNoDiscount += userCart.totalPriceWithNoDiscount;

        let orderTransportCost = userCart.transportCost;
        if (
          userCart.transportCost &&
          totalPrice - userCart.transportCost >= transportMinimumFreeCost
        ) {
          totalPrice -= userCart.transportCost;
          orderTransportCost = 0;
        } else if (
          !userCart.transportCost &&
          totalPrice < transportMinimumFreeCost
        ) {
          totalPrice += transportCost;
          orderTransportCost = transportCost;
        }

        return await this.OrdersRepository.updateCart(
          OrderDto,
          userCart._id as any,
          totalPrice,
          orderTransportCost,
          totalPriceWithNoDiscount,
        );
      } else {
        if (isProductExistInCard.products[0].count <= OrderDto.count * -1) {
          const result = await this.OrdersRepository.deleteProductFromOrder(
            userCart._id as any,
            (isProductExistInCard.products[0] as any)._id,
          );

          let newTotalPrice = 0;
          let newTotalPriceWithNoDiscount = 0;
          let orderTransportCost = userCart.transportCost;

          for (const product of userCart.products) {
            if (
              product._id.toString() !==
              (isProductExistInCard.products[0] as any)._id.toString()
            ) {
              const productModel =
                await this.ProductModelsService.findProductModel(
                  product.productModelsID,
                  product.productModelID,
                );

              const priceWithDiscount = productModel.productModels[0].discount
                ? ((productModel.productModels[0].price *
                    (100 - productModel.productModels[0].discount)) /
                    100) *
                  product.count
                : productModel.productModels[0].price * product.count;

              const priceWithoutDiscount =
                productModel.productModels[0].price * product.count;

              newTotalPrice += priceWithDiscount;
              newTotalPriceWithNoDiscount += priceWithoutDiscount;
            }
          }

          if (newTotalPrice < transportMinimumFreeCost) {
            newTotalPrice += transportCost;
            orderTransportCost = transportCost;
          } else {
            orderTransportCost = 0;
          }

          userCart.totalPrice = newTotalPrice;
          userCart.totalPriceWithNoDiscount = newTotalPriceWithNoDiscount;
          userCart.transportCost = orderTransportCost;

          await userCart.save();

          result.totalPrice = newTotalPrice;
          result.totalPriceWithNoDiscount = newTotalPriceWithNoDiscount;
          result.transportCost = orderTransportCost;

          return result;
        }

        const productModel = await this.ProductModelsService.findProductModel(
          OrderDto.productModelsID,
          OrderDto.productModelID,
        );

        let totalPrice = productModel.productModels[0].discount
          ? ((productModel.productModels[0].price *
              (100 - productModel.productModels[0].discount)) /
              100) *
            OrderDto.count
          : productModel.productModels[0].price * OrderDto.count;
        let totalPriceWithNoDiscount =
          productModel.productModels[0].price * OrderDto.count;

        totalPrice += userCart.totalPrice;
        totalPriceWithNoDiscount += userCart.totalPriceWithNoDiscount;

        let orderTransportCost = userCart.transportCost;
        if (
          userCart.transportCost &&
          totalPrice - userCart.transportCost >= transportMinimumFreeCost
        ) {
          totalPrice -= userCart.transportCost;
          orderTransportCost = 0;
        } else if (
          !userCart.transportCost &&
          totalPrice < transportMinimumFreeCost
        ) {
          totalPrice += transportCost;
          orderTransportCost = transportCost;
        }

        const count = isProductExistInCard.products[0].count + OrderDto.count;

        OrderDto.count = count;

        const orders = { products: [OrderDto] };

        await this.checkIfThereIsEnoughProduct(orders as any);

        return await this.OrdersRepository.updateProductInOrderProducts(
          user,
          (isProductExistInCard.products[0] as any)._id,
          count,
          totalPrice,
          orderTransportCost,
          totalPriceWithNoDiscount,
        );
      }
    }
  }

  async findOrderById(id: Schema.Types.ObjectId) {
    const order = this.OrdersRepository.findOrderById(id);

    if (!order) throw new NotFoundException('order not found');

    return order;
  }

  async findUserCart(user: Schema.Types.ObjectId) {
    return (await this.OrdersRepository.findUserCart(user)) || [];
  }

  async deleteOrder(userId: Schema.Types.ObjectId) {
    const deletedOrder = await this.OrdersRepository.deleteOrder(userId);

    if (!deletedOrder) throw new NotFoundException('you do not have any cart');

    return deletedOrder;
  }

  async findOrderByUserAndProduct(
    userId: Schema.Types.ObjectId,
    productID: Schema.Types.ObjectId,
  ) {
    return await this.OrdersRepository.findOrderByUserAndProduct(
      userId,
      productID,
    );
  }

  async addDiscountCodeAndUpdateTotalPrice(
    orderId: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    offCode: string,
  ) {
    await this.DiscountCodeService.isCodeValid(offCode, user);

    const order = await this.findOrderById(orderId);

    if (order.status !== 'payment')
      throw new BadRequestException('you cannot do this action');

    if (order?.discountCode?.discount)
      order.totalPrice += order.discountCode.discount;

    const { calculatedPrice, offPrice } =
      await this.DiscountCodeService.calculateTotalPrice(
        order.totalPrice,
        offCode,
      );

    return await this.OrdersRepository.addDiscountCodeAndUpdateTotalPrice(
      { code: offCode, discount: offPrice },
      calculatedPrice,
      orderId,
    );
  }

  async getUserOrders(user: Schema.Types.ObjectId) {
    return await this.OrdersRepository.getUserOrders(user);
  }

  async getOrdersDate(timeFrame: timeFrameDto) {
    return await this.OrdersRepository.getOrdersByFilter([
      {
        $match: {
          $and: [
            { createdAt: { $gte: timeFrame.startTime } },
            { createdAt: { $lte: timeFrame.endTime } },
            {
              status: {
                $nin: ['payment', 'paySlipsReview', 'failed', 'pending'],
              },
            },
          ],
        },
      },
      {
        $unwind: '$products',
      },
      {
        $group: {
          _id: { $dayOfMonth: '$createdAt' },
          count: { $sum: 1 },
          income: { $sum: '$totalPrice' },
          saleCount: { $sum: '$products.count' },
          totalDiscount: {
            $sum: '$discountCode.discount',
          },
        },
      },
      {
        $addFields: { dayOfMonth: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          dayOfMonth: 1,
        },
      },
    ]);
  }

  async findOrderByAuthorityAndUser(
    userId: Schema.Types.ObjectId,
    authority: string,
  ) {
    const data = await this.OrdersRepository.findOrderByAuthorityAndUser(
      userId,
      authority,
    );

    if (!data?.length) throw new NotFoundException('order not found');

    return data;
  }

  async getAllOrders(query: any) {
    return await this.OrdersRepository.getAllOrders(query);
  }
}
