import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductModelsService } from './product-models.service';
import { ProductModelDto } from './dto/productModelsDto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Schema } from 'mongoose';

@ApiBearerAuth()
@ApiTags('Products', 'ProductsModel')
@Controller('product-models')
export class ProductModelsController {
  constructor(private readonly productModelsService: ProductModelsService) {}

  @Post('create')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 500,
    description: 'this error will happen if id is not valid',
  })
  async createProductModel(@Body() CreateProductModelDto: ProductModelDto) {
    const data = await this.productModelsService.createProductModel(
      CreateProductModelDto,
    );

    return { message: 'product model created successfully', data };
  }

  @Put('update/:id/:modelId')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiParam({
    name: 'product model id',
  })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 500,
    description: 'this error will happen if id is not valid',
  })
  async updateProductModel(
    @Body() updateProductModelDto: ProductModelDto,
    @Param('id') id: Schema.Types.ObjectId,
    @Param('modelId') modelId: Schema.Types.ObjectId,
  ) {
    const data = await this.productModelsService.updateProductModel(
      id,
      modelId,
      updateProductModelDto,
    );

    return { message: 'product model updated successfully', data };
  }

  @Delete('delete/:id')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiParam({
    name: 'product model id',
  })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 500,
    description: 'this error will happen if id is not valid',
  })
  async deleteProductModel(@Param('id') id: Schema.Types.ObjectId) {
    await this.productModelsService.deleteProductModelById(id);

    return { message: 'product model deleted successfully' };
  }
}
