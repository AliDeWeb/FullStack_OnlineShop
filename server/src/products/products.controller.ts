import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { uploadProductImageMulterOptions } from 'src/helper/multerConfigs/uploadProductImage.config';
import { Schema } from 'mongoose';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ChangeProductActiveStatusDto } from './dto/changeProductActiveStatus.dto';
import { DeleteImageDto } from './dto/deleteImage.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('most-discount-products')
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @ApiQuery({
    name: 'limit',
    example: '?limit=5',
    description: 'default value is 20',
  })
  @HttpCode(200)
  async mostDiscountProducts(@Query('limit') limit: string) {
    return await this.productsService.mostDiscountProducts(Number(limit));
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Post('create-new-product')
  @UseInterceptors(
    FilesInterceptor('images', 10, uploadProductImageMulterOptions),
  )
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
  async createProduct(
    @Body() productData: CreateProductDto,
    @UploadedFiles() files: any,
  ) {
    productData.images = files.map(
      (file: any) => `uploads/images/products/${file.filename}`,
    );

    const data = await this.productsService.createProduct(productData);

    return { message: 'product created successfully', data };
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Patch('update-product/:id')
  @UseInterceptors(
    FilesInterceptor('images', 10, uploadProductImageMulterOptions),
  )
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
    name: 'product id',
    description: 'this parameter must be a valid product id',
  })
  @ApiBearerAuth()
  async updateProduct(
    @Body() productData: UpdateProductDto,
    @Param('id') id: Schema.Types.ObjectId,
    @UploadedFiles() files: any,
  ) {
    let images: string[] | undefined;
    if (files.length) {
      images = files.map(
        (file: any) => `uploads/images/products/${file.filename}`,
      );
    }

    const data = images?.length
      ? await this.productsService.updateProduct(id, productData, images)
      : await this.productsService.updateProduct(id, productData);

    return { message: 'product updated successfully', data };
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Delete('delete-product-images/:id')
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
    name: 'product id',
    description: 'this parameter must be a valid product id',
  })
  @ApiBearerAuth()
  async deleteProductImages(
    @Body() DeleteImageDto: DeleteImageDto,
    @Param('id') id: Schema.Types.ObjectId,
  ) {
    const data = await this.productsService.deleteProductImages(
      id,
      DeleteImageDto,
    );

    return { message: 'product images deleted successfully', data };
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Delete('delete-product/:id')
  @HttpCode(200)
  @ApiParam({
    name: 'product id',
    required: true,
    description: 'this parameter must be a valid product id',
  })
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 401,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 500,
    description: 'this error will happen if id is not valid',
  })
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiBearerAuth()
  async deleteProduct(@Param('id') id: Schema.Types.ObjectId) {
    await this.productsService.deleteProduct(id);

    return { message: 'product deleted successfully' };
  }

  @Get('products-data')
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @HttpCode(200)
  async getProductsInfo() {
    return await this.productsService.getProductsData();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 500,
    description: 'this error will happen if id is not valid',
  })
  @HttpCode(200)
  @ApiParam({
    name: 'product id',
    required: true,
    description: 'this parameter must be a valid product id',
  })
  async getProduct(@Param('id') id: Schema.Types.ObjectId) {
    return await this.productsService.findProductById(id);
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description:
      'res contains all products that their title or description contains the search value',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'you can sort the results based on results fields like:',
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'you can limit the number of results',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description:
      'you can paginate the result the way you like, the default value is: `10`',
  })
  @ApiQuery({
    name: 'fields',
    required: false,
    description:
      'you can select the fields that you need, notice that do not deselect the fields witch are in `sort`',
  })
  @ApiQuery({
    name: 'res keys',
    required: false,
    description:
      'you can filter the result by passing the key and the value of the field you want. notice: to filter number fields like price you can use `gt | gte | lt | lte` such as the example',
    example: 'title=`shirt` OR price[gte]=`80`',
  })
  @HttpCode(200)
  async getAllProducts(@Query() query: any) {
    return await this.productsService.findAllProducts(query);
  }

  @Patch('change-product-active-status/:id')
  @ApiBearerAuth()
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 401,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 500,
    description: 'this error will happen if id is not valid',
  })
  @ApiParam({
    name: 'product id',
    required: true,
    description: 'this parameter must be a valid product id',
  })
  async changeProductActiveStatus(
    @Param('id') id: Schema.Types.ObjectId,
    @Body() isActive: ChangeProductActiveStatusDto,
  ) {
    const data = await this.productsService.changeProductActiveStatus(
      isActive.isActive,
      id,
    );

    return { message: 'product active status changed successfully', data };
  }
}
