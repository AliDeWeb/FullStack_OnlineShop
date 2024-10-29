import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ConfigsService } from './configs.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProtectedRouteGuard } from '../auth/guard/protectedRoute.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ConfigDto } from './dto/config.dto';
import { config, configsEnum } from '../utilities/types/configs.type';
import { Schema } from 'mongoose';

@Controller('configs')
@ApiTags('Configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Post('create-config')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
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
  async createConfig(@Body() ConfigDto: ConfigDto) {
    const data = await this.configsService.createConfig(ConfigDto);

    return { message: 'config created successfully', data };
  }

  @Put('update-config/:id')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @HttpCode(201)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
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
  @ApiParam({
    name: 'config id',
    required: true,
  })
  async updateConfig(
    @Body() ConfigDto: ConfigDto,
    @Param('id') id: Schema.Types.ObjectId,
  ) {
    const data = await this.configsService.updateConfig(id, ConfigDto);

    return { message: 'config updated successfully', data };
  }

  @Get('/:key')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 404,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiParam({
    name: 'key',
    required: true,
    description: `param must be ${configsEnum.join(', ')}`,
  })
  async findConfigByKey(@Param('key') key: config) {
    return await this.configsService.findConfigByKey(key);
  }
}
