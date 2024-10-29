import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CoversService } from './covers.service';
import { CreateCoverDto } from './dto/create-cover.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { uploadCoversImage } from '../helper/multerConfigs/uploadCoversImage.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProtectedRouteGuard } from '../auth/guard/protectedRoute.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Schema } from 'mongoose';

@ApiTags('Covers')
@Controller('covers')
export class CoversController {
  constructor(private readonly coversService: CoversService) {}

  @Post('upload-cover')
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
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image', uploadCoversImage))
  async create(
    @Body() createCoverDto: CreateCoverDto,
    @UploadedFile() file: any,
  ) {
    createCoverDto.image = `uploads/images/covers/${file.filename}`;

    const data = await this.coversService.create(createCoverDto);

    return { message: 'cover uploaded successfully', data };
  }

  @Get('all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  async findAll() {
    return await this.coversService.findAll();
  }

  @Delete('delete/:id')
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
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'product id',
  })
  async deleteCover(@Param('id') id: Schema.Types.ObjectId) {
    await this.coversService.deleteCover(id);

    return { message: 'cover deleted successfully' };
  }
}
