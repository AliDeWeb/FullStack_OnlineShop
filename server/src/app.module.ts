import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RequestLoggerMiddleware } from './middlewares/request-logger/request-logger.middleware';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NewsletterModule } from './newsletter/newsletter.module';
import { CategoriesModule } from './categories/categories.module';
import { TicketsModule } from './tickets/tickets.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BrandsModule } from './brands/brands.module';
import { ProductModelsModule } from './product-models/product-models.module';
import { OrdersModule } from './orders/orders.module';
import { CoversModule } from './covers/covers.module';
import { ConfigsModule } from './configs/configs.module';
import { DiscountCodeModule } from './discount-code/discount-code.module';
import { PrePaymentMiddlewares } from './middlewares/pre-payment/pre-payment.middlewares';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: 'static' }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE, {
      autoIndex: true,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    NewsletterModule,
    CategoriesModule,
    TicketsModule,
    CommentsModule,
    NotificationsModule,
    BrandsModule,
    ProductModelsModule,
    OrdersModule,
    CoversModule,
    ConfigsModule,
    DiscountCodeModule,
    AddressesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    consumer
      .apply(PrePaymentMiddlewares)
      .forRoutes({ path: 'payment/pay/*', method: RequestMethod.POST });
  }
}
