import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product/product.schema';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { BrandsModule } from 'src/brands/brands.module';
import { ProductModelsModule } from '../product-models/product-models.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UsersModule,
    CategoriesModule,
    BrandsModule,
    forwardRef(() => ProductModelsModule),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    RolesGuard,
    ProtectedRouteGuard,
  ],
  exports: [ProductsRepository, ProductsService],
})
export class ProductsModule {}
