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
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/createAddress.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRouteGuard } from '../auth/guard/protectedRoute.guard';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { Schema } from 'mongoose';

@Controller('addresses')
@ApiTags('Addresses')
@ApiBearerAuth()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get('get-my-addresses')
  @UseGuards(ProtectedRouteGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  async getUserAddresses(@Request() req: any) {
    return await this.addressesService.getUserAddresses(req.user.id);
  }

  @Post('create-address')
  @UseGuards(ProtectedRouteGuard)
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
    status: 404,
    description: 'response contains a error message',
  })
  async createAddress(
    @Body() CreateAddressDto: CreateAddressDto,
    @Request() req: any,
  ) {
    const data = await this.addressesService.createAddress({
      ...CreateAddressDto,
      user: req.user.id,
    });

    return { message: 'address created', data };
  }

  @Patch('update-address/:id')
  @UseGuards(ProtectedRouteGuard)
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
    status: 404,
    description: 'response contains a error message',
  })
  async updateAddress(
    @Body() UpdateAddressDto: UpdateAddressDto,
    @Request() req: any,
    @Param('id') id: Schema.Types.ObjectId,
  ) {
    const data = await this.addressesService.updateAddress(
      UpdateAddressDto,
      req.user.id,
      id,
    );

    return { message: 'address updated', data };
  }

  @Delete('delete-address/:id')
  @UseGuards(ProtectedRouteGuard)
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
    status: 404,
    description: 'response contains a error message',
  })
  async deleteAddress(
    @Request() req: any,
    @Param('id') id: Schema.Types.ObjectId,
  ) {
    await this.addressesService.deleteAddress(id, req.user.id);

    return { message: 'address deleted' };
  }
}
