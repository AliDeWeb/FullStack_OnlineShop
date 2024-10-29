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
import { BrandsService } from './brands.service';
import { Schema } from 'mongoose';
import { BrandDto } from './dto/brand.dto';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadBrandsImage } from 'src/helper/multerConfigs/uploadBrandImage.config';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Post('create')
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
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image', uploadBrandsImage))
  async createBrand(@Body() brandData: BrandDto, @UploadedFile() file: any) {
    const data = await this.brandsService.createBrand(
      brandData,
      file?.filename ? `uploads/images/brands/${file?.filename}` : null,
    );

    return { message: 'brand created successfully', data };
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Put('update/:id')
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
    name: 'brand id',
    description: 'must be a valid brand id',
  })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image', uploadBrandsImage))
  async updateBrand(
    @Param('id') id: Schema.Types.ObjectId,
    @Body() brandData: BrandDto,
    @UploadedFile() file: any,
  ) {
    let data;
    if (file?.filename) {
      data = await this.brandsService.updateBrand(
        id,
        brandData,
        `uploads/images/brands/${file.filename}`,
      );
    } else {
      data = await this.brandsService.updateBrand(id, brandData);
    }

    return { message: 'brand updated successfully', data };
  }

  @Get('all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  async getAllBrands() {
    return await this.brandsService.getAllBrands();
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 404,
    description: 'response contains a error message',
  })
  @ApiParam({
    name: 'brand id',
    description: 'must be a valid brand id',
  })
  async findBrandById(@Param('id') id: Schema.Types.ObjectId) {
    return await this.brandsService.findBrandById(id);
  }

  @Get('title/:title')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 404,
    description: 'response contains a error message',
  })
  @ApiParam({
    name: 'title',
    description: 'must be a valid brand title',
  })
  async findBrandByTitle(@Param('title') title: string) {
    return await this.brandsService.findBrandByTitle(title);
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Delete('delete/:id')
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
  @ApiBearerAuth()
  async deleteBrand(@Param('id') id: Schema.Types.ObjectId) {
    await this.brandsService.deleteBrand(id);

    return { message: 'brand deleted successfully' };
  }
}
