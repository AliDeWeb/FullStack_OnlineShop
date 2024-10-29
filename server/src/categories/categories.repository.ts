import { Model, Schema } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from '../schemas/category/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './dto/category.dto';

export class categoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly CategoryModel: Model<CategoryDocument>,
  ) {}

  async createCategory(categoryData: CategoryDto, imageUrl: string | null) {
    return await this.CategoryModel.create({
      ...categoryData,
      image: imageUrl,
    });
  }

  async deleteCategory(categoryId: Schema.Types.ObjectId) {
    return await this.CategoryModel.findByIdAndDelete(categoryId).exec();
  }

  async findAllCategories() {
    return await this.CategoryModel.find()
      .populate('products')
      .select('-__v')
      .exec();
  }

  async findCategoryById(id: Schema.Types.ObjectId) {
    return await this.CategoryModel.findById(id)
      .populate('products')
      .select('-__v')
      .exec();
  }

  async findCategoryByIdWithoutPopulate(id: Schema.Types.ObjectId) {
    return await this.CategoryModel.findById(id).exec();
  }

  async findCategoryByTitle(title: string) {
    return await this.CategoryModel.findOne({ title }).select('title');
  }

  async updateCategory(
    categoryData: CategoryDto,
    categoryId: Schema.Types.ObjectId,
  ) {
    return await this.CategoryModel.findByIdAndUpdate(
      categoryId,
      categoryData,
      { new: true },
    ).exec();
  }
}
