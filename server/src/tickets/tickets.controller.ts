import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { Schema } from 'mongoose';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(ProtectedRouteGuard)
  @Post('create-ticket')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'response will be a message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  async createTicket(@Body() TicketData: CreateTicketDto, @Request() req: any) {
    const data = await this.ticketsService.createTicket(
      TicketData,
      req.user.id,
    );

    return { message: 'ticket created successfully', data };
  }

  @UseGuards(ProtectedRouteGuard)
  @Post('response-ticket/:id')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'response will be a message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiParam({
    name: 'ticket id',
    description: 'provide a valid ticket id',
    required: true,
  })
  async responseToTicket(
    @Body() TicketData: CreateTicketDto,
    @Request() req: any,
    @Param('id') ticketId: Schema.Types.ObjectId,
  ) {
    const data = await this.ticketsService.responseToTicket(
      TicketData,
      req.user.id,
      ticketId,
    );

    return { message: 'ticket response sent successfully', data };
  }

  @UseGuards(ProtectedRouteGuard)
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @Get('my-tickets')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'response will be a message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  getAllUserTickets(@Request() req: any) {
    return this.ticketsService.getAllUserTickets(req.user.id);
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'response will be a message' })
  @ApiResponse({ status: 400, description: 'response will be a error message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  @ApiParam({
    name: 'ticket id',
    description: 'provide a valid ticket id',
    required: true,
  })
  @Get('admin/:id')
  async findTicketByIdAdmin(
    @Param('id') id: Schema.Types.ObjectId,
    @Request() req: any,
  ) {
    return await this.ticketsService.findTicketById(id, 'admin', req.user.id);
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('user')
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'response will be a message' })
  @ApiResponse({ status: 400, description: 'response will be a error message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  @ApiParam({
    name: 'ticket id',
    description: 'provide a valid ticket id',
    required: true,
  })
  @Get('/:id')
  async findTicketById(
    @Param('id') id: Schema.Types.ObjectId,
    @Request() req: any,
  ) {
    return await this.ticketsService.findTicketById(id, 'user', req.user.id);
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'response will be a message' })
  @ApiResponse({ status: 403, description: 'response will be a error message' })
  @ApiQuery({ name: 'filtering configs', required: false })
  @Get('')
  async getAllTickets(@Query() query) {
    return await this.ticketsService.findAllTickets(query);
  }
}
