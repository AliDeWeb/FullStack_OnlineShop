import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { ProtectedRouteGuard } from '../auth/guard/protectedRoute.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadCategoriesImage } from 'src/helper/multerConfigs/uploadCategoryImage.config';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains all categories data',
  })
  async getAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains category data',
  })
  @ApiResponse({
    status: 400,
    description: 'invalid category Id',
  })
  async getCategory(@Param('id') id: Schema.Types.ObjectId) {
    return this.categoriesService.findCategoryById(id);
  }

  @Get('get/:title')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains category data',
  })
  @ApiResponse({
    status: 400,
    description: 'invalid category Id',
  })
  @ApiParam({
    name: 'title',
  })
  async findCategoryByTitle(@Param('title') title: string) {
    return await this.categoriesService.findCategoryByTitle(title);
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Post('create')
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @UseInterceptors(FileInterceptor('image', uploadCategoriesImage))
  async createCategory(
    @Body() categoryData: CategoryDto,
    @UploadedFile() file: any,
  ) {
    const data = await this.categoriesService.createCategory(
      categoryData,
      file?.filename ? `uploads/images/categories/${file?.filename}` : null,
    );

    return { message: `category created successfully`, data };
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Delete('delete/:id')
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiParam({
    name: 'category id',
    description: 'this must be a valid category id',
  })
  async deleteCategory(@Param('id') id: Schema.Types.ObjectId) {
    await this.categoriesService.deleteCategory(id);

    return { message: 'category deleted successfully' };
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Put('update/:id')
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiParam({
    name: 'category id',
    description: 'this must be a valid category id',
  })
  @UseInterceptors(FileInterceptor('image', uploadCategoriesImage))
  async updateCategory(
    @Body() CategoryDto: CategoryDto,
    @Param('id') id: Schema.Types.ObjectId,
    @UploadedFile() file: any,
  ) {
    let data;
    if (file?.filename) {
      data = await this.categoriesService.updateCategory(
        CategoryDto,
        id,
        `uploads/images/categories/${file.filename}`,
      );
    } else {
      data = await this.categoriesService.updateCategory(CategoryDto, id);
    }

    return { message: 'category updated successfully', data };
  }
}
