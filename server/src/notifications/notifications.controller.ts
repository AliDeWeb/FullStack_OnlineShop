import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { Schema } from 'mongoose';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @Roles('admin', 'owner')
  @Post('create')
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
  async sendNotification(@Body() CreateNotificationDto: CreateNotificationDto) {
    await this.notificationsService.sendNotification(CreateNotificationDto);

    return { message: 'notification sent successfully' };
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @Roles('admin', 'owner')
  @Delete('delete/:id')
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
  @ApiParam({
    name: 'notification id',
  })
  async deleteNotification(@Param('id') id: Schema.Types.ObjectId) {
    await this.notificationsService.deleteNotification(id);

    return { message: 'notification deleted successfully' };
  }

  @UseGuards(ProtectedRouteGuard)
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @Get('user-notification')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
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
  async getUserNotification(@Request() req: any) {
    return await this.notificationsService.getUserNotification(req.user.id);
  }

  @UseGuards(ProtectedRouteGuard)
  @Roles('admin', 'owner')
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @Get('notifications')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
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
  async getAllNotifications() {
    return await this.notificationsService.getAllNotifications();
  }
}
