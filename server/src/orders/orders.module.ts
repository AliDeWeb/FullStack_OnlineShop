import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../schemas/order/order.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ProductModelsModule } from '../product-models/product-models.module';
import { ProductsModule } from '../products/products.module';
import { ConfigsModule } from '../configs/configs.module';
import { DiscountCodeModule } from 'src/discount-code/discount-code.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    AuthModule,
    UsersModule,
    ProductModelsModule,
    ProductsModule,
    ConfigsModule,
    DiscountCodeModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
