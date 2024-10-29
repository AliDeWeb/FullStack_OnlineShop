import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { categoryRepository } from './categories.repository';
import { CategoryDto } from './dto/category.dto';
import { Schema } from 'mongoose';
import { deleteFile } from 'src/utilities/funcs/delete-file';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: categoryRepository) {}

  async createCategory(categoryData: CategoryDto, imageUrl: string | null) {
    const isCategoryExist = await this.categoryRepository.findCategoryByTitle(
      categoryData.title,
    );

    if (isCategoryExist)
      throw new BadRequestException('category is already exist');

    return await this.categoryRepository.createCategory(categoryData, imageUrl);
  }

  async deleteCategory(categoryId: Schema.Types.ObjectId) {
    const deletedCategory =
      await this.categoryRepository.deleteCategory(categoryId);

    if (!deletedCategory)
      throw new BadRequestException('category is not found');

    await deleteFile(`static/${deletedCategory.image}`);

    return deletedCategory;
  }

  async findAllCategories() {
    return await this.categoryRepository.findAllCategories();
  }

  async findCategoryById(id: Schema.Types.ObjectId) {
    const category = await this.categoryRepository.findCategoryById(id);

    if (!category) throw new NotFoundException('the category is not found');

    return category;
  }

  async findCategoryByIdWithoutPopulate(id: Schema.Types.ObjectId) {
    const category =
      await this.categoryRepository.findCategoryByIdWithoutPopulate(id);

    if (!category) throw new NotFoundException('the category is not found');

    return category;
  }

  async findCategoryByTitle(title: string) {
    return await this.categoryRepository.findCategoryByTitle(title);
  }

  async updateCategory(
    categoryData: CategoryDto,
    categoryId: Schema.Types.ObjectId,
    imageUrl?: string | null,
  ) {
    if (imageUrl) {
      Object.assign(categoryData, { image: imageUrl });
    }

    const updatedCategory = await this.categoryRepository.updateCategory(
      categoryData,
      categoryId,
    );

    if (!updatedCategory) throw new NotFoundException('category is not found');

    if (imageUrl) {
      try {
        await deleteFile(`static/${updatedCategory.image}`);
      } catch (err) {
        console.log(err);
      }
    }

    return updatedCategory;
  }
}
