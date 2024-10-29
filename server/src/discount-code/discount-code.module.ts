import { forwardRef, Module } from '@nestjs/common';
import { DiscountCodeService } from './discount-code.service';
import { DiscountCodeController } from './discount-code.controller';
import { DiscountCodeRepository } from './discount-code.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DiscountCode,
  DiscountCodeSchema,
} from 'src/schemas/discountCode/discountCode.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DiscountCode.name, schema: DiscountCodeSchema },
    ]),
    AuthModule,
    UsersModule,
    forwardRef(() => OrdersModule),
  ],
  controllers: [DiscountCodeController],
  providers: [DiscountCodeService, DiscountCodeRepository],
  exports: [DiscountCodeService],
})
export class DiscountCodeModule {}
