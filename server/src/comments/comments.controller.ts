import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createCommentDto } from './dto/createComment.dto';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Schema } from 'mongoose';
import { ResponseToCommentDto } from './dto/responseToComment.dto';
import { timeFrameDto } from '../utilities/publicDto/timeFrame.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('get-all-comments')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'contains a message' })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiBearerAuth()
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
  async getAllNotAcceptedComments(@Query() query: any) {
    return await this.commentsService.getAllComments(query);
  }

  @Get('get-my-comments')
  @UseGuards(ProtectedRouteGuard)
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'contains a message' })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiBearerAuth()
  async getMyComments(@Request() req: any) {
    return await this.commentsService.getMyComments(req.user.id);
  }

  @Post('add-new-comment')
  @UseGuards(ProtectedRouteGuard)
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'contains a message' })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 404,
    description: 'this error will happen if id is not valid',
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  async addNewComment(
    @Body() addNewCommentData: createCommentDto,
    @Request() req: any,
  ) {
    await this.commentsService.addNewComment(addNewCommentData, req.user.id);

    return { message: 'comment will be shown after admin reviews' };
  }

  @Post('accept-comment/:id')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'contains a message' })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 404,
    description: 'this error will happen if id is not valid',
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiParam({
    name: 'comment id',
    description: 'provide a valid comment id',
  })
  async acceptComment(@Param('id') id: Schema.Types.ObjectId) {
    const data = await this.commentsService.acceptComment(id);

    return { message: 'comment accepted successfully', data };
  }

  @Post('response-to-comment/:id')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'contains a message' })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 404,
    description: 'this error will happen if id is not valid',
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiParam({
    name: 'comment id',
    description: 'provide a valid comment id',
  })
  async responseToComment(
    @Param('id') id: Schema.Types.ObjectId,
    @Request() req: any,
    @Body() resData: ResponseToCommentDto,
  ) {
    await this.commentsService.responseToComment(
      id,
      req.user.id,
      resData.response,
    );

    return { message: 'response created successfully' };
  }

  @Post('comments-data')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'contains a message' })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  async getCommentsData(
    @Body()
    timeFrameDto: timeFrameDto,
  ) {
    return await this.commentsService.getCommentsData(timeFrameDto);
  }

  @Delete('delete-comment/:commentId')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'contains a message' })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiParam({
    name: 'comment id',
    description: 'provide a valid comment id',
  })
  @ApiBearerAuth()
  async deleteComment(@Param('commentId') commentId: Schema.Types.ObjectId) {
    await this.commentsService.deleteComment(commentId);

    return { message: 'comment deleted successfully' };
  }
}
