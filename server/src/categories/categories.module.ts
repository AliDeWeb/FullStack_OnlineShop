import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoryRepository } from './categories.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../schemas/category/category.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, categoryRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
