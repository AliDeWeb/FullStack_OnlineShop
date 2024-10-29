import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DiscountCodeService } from './discount-code.service';
import { CreateDiscountCodeDto } from './dto/createDiscountCode.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Schema } from 'mongoose';
import { UpdateDiscountCodeDto } from './dto/updateDiscountCode.dto';

@ApiTags('DiscountCodes')
@ApiBearerAuth()
@ApiHeader({
  name: 'authorization',
  example: 'Bearer {{Token Here}}',
  description: 'authorization must be like `Bearer {{Token Here}}`',
  required: true,
})
@Controller('discount-code')
export class DiscountCodeController {
  constructor(private readonly discountCodeService: DiscountCodeService) {}

  @Post('create-code')
  @HttpCode(201)
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiResponse({ status: 201, description: 'response will be a message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  async createDiscountCode(
    @Body() CreateDiscountCodeDto: CreateDiscountCodeDto,
  ) {
    const data = await this.discountCodeService.createDiscountCode(
      CreateDiscountCodeDto,
    );

    return { message: 'discount code created successfully', data };
  }

  @Patch('update-code/:id')
  @HttpCode(201)
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiResponse({ status: 201, description: 'response will be a message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  @ApiResponse({ status: 404, description: 'response will be a error message' })
  @ApiParam({ name: 'discountCodeId', required: true })
  async updateDiscountCode(
    @Body() UpdateDiscountCodeDto: UpdateDiscountCodeDto,
    @Param('id') id: Schema.Types.ObjectId,
  ) {
    const data = await this.discountCodeService.updateDiscountCode(
      UpdateDiscountCodeDto,
      id,
    );

    return { message: 'discount code updated successfully', data };
  }

  @Get('get-all')
  @HttpCode(200)
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiResponse({ status: 200, description: 'response will be a message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  async getAllDiscountCodes() {
    return await this.discountCodeService.getAllDiscountCodes();
  }

  @Delete('delete-code/:id')
  @HttpCode(201)
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiResponse({ status: 201, description: 'response will be a message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  @ApiResponse({ status: 404, description: 'response will be a error message' })
  @ApiParam({ name: 'discountCodeId', required: true })
  async deleteDiscountCode(@Param('id') id: Schema.Types.ObjectId) {
    await this.discountCodeService.deleteDiscountCode(id);

    return { message: 'discount code deleted successfully' };
  }

  @Get('validate-code/:code')
  @HttpCode(200)
  @UseGuards(ProtectedRouteGuard)
  @ApiResponse({ status: 200, description: 'response will be a message' })
  @ApiResponse({ status: 400, description: 'response will be a error message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  @ApiResponse({ status: 404, description: 'response will be a error message' })
  @ApiParam({ name: 'code', required: true })
  async isCodeValid(@Param('code') code: string, @Request() req: any) {
    return await this.discountCodeService.isCodeValid(code, req.user.id);
  }
}
