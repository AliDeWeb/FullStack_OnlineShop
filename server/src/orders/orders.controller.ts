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
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ProtectedRouteGuard } from '../auth/guard/protectedRoute.guard';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateOrderStatusDto } from './dto/updateOrderStatus.dto';
import { OrderDto } from './dto/order.dto';
import { AddDiscountCodeAndUpdateTotalPriceDto } from './dto/addDiscountCodeAndUpdateTotalPrice.dto';
import { timeFrameDto } from '../utilities/publicDto/timeFrame.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@ApiHeader({
  name: 'authorization',
  example: 'Bearer {{Token Here}}',
  description: 'authorization must be like `Bearer {{Token Here}}`',
  required: true,
})
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('update-cart')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'response will be a message' })
  @ApiResponse({ status: 404, description: 'response will be a error message' })
  @UseGuards(ProtectedRouteGuard)
  async updateUserCart(@Body() OrderDto: OrderDto, @Request() req: any) {
    const data = await this.ordersService.updateUserCart(OrderDto, req.user.id);

    return { message: 'order registered successfully', data };
  }

  @Get('my-cart')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'response will be a message' })
  @ApiResponse({ status: 404, description: 'response will be a error message' })
  @UseGuards(ProtectedRouteGuard)
  async getUserCart(@Request() req: any) {
    return await this.ordersService.findUserCart(req.user.id);
  }

  @Get('all-orders')
  @HttpCode(200)
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
  @ApiResponse({ status: 200, description: 'response will be a message' })
  @ApiResponse({ status: 404, description: 'response will be a error message' })
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('owner', 'admin')
  async getAllOrders(@Query() query: any) {
    return await this.ordersService.getAllOrders(query);
  }

  @Get('my-orders')
  @UseGuards(ProtectedRouteGuard)
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'response will be a message' })
  @ApiResponse({ status: 404, description: 'response will be a error message' })
  async getUserOrders(@Request() req: any) {
    return await this.ordersService.getUserOrders(req.user.id);
  }

  @Patch('/update-order-status/:id')
  @HttpCode(201)
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiResponse({ status: 201, description: 'response will be a message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  @ApiParam({ name: 'OrderId', required: true })
  async updateOrderStatus(
    @Body() UpdateOrderStatusDto: UpdateOrderStatusDto,
    @Param('id') id: Schema.Types.ObjectId,
  ) {
    const data = await this.ordersService.updateOrderStatus(
      id,
      UpdateOrderStatusDto.status,
    );

    return { message: 'order status updated successfully', data };
  }

  @Delete('/delete-order')
  @HttpCode(201)
  @UseGuards(ProtectedRouteGuard)
  @ApiResponse({ status: 201, description: 'response will be a message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  async deleteOrder(@Request() req: any) {
    await this.ordersService.deleteOrder(req.user.id);

    return { message: 'order deleted successfully' };
  }

  @Post('/add-discount-code/:order')
  @HttpCode(201)
  @UseGuards(ProtectedRouteGuard)
  @ApiResponse({ status: 201, description: 'response will be a message' })
  @ApiResponse({ status: 400, description: 'response will be a error message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  @ApiParam({ name: 'orderId' })
  async addDiscountCodeAndUpdateTotalPrice(
    @Request() req: any,
    @Param('order') order: Schema.Types.ObjectId,
    @Body()
    AddDiscountCodeAndUpdateTotalPriceDto: AddDiscountCodeAndUpdateTotalPriceDto,
  ) {
    const data = await this.ordersService.addDiscountCodeAndUpdateTotalPrice(
      order,
      req.user.id,
      AddDiscountCodeAndUpdateTotalPriceDto.offCode,
    );

    return { message: 'order deleted successfully', data };
  }

  @Post('orders-data')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'contains a message' })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  async getCommentsData(
    @Body()
    timeFrameDto: timeFrameDto,
  ) {
    return await this.ordersService.getOrdersDate(timeFrameDto);
  }
}
