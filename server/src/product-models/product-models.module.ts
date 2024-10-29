import { forwardRef, Module } from '@nestjs/common';
import { ProductModelsService } from './product-models.service';
import { ProductModelsController } from './product-models.controller';
import { ProductModelsRepository } from './product-models.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductModel,
  ProductModelSchema,
} from 'src/schemas/productModel/productModel.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductModelSchema },
    ]),
    AuthModule,
    UsersModule,
    CategoriesModule,
    forwardRef(() => ProductsModule),
  ],
  controllers: [ProductModelsController],
  providers: [ProductModelsService, ProductModelsRepository],
  exports: [ProductModelsService],
})
export class ProductModelsModule {}
