import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
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
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize/serialize.interceptors';
import { updateUserRoleDto } from './dto/updateUserRole.dto';
import { timeFrameDto } from '../utilities/publicDto/timeFrame.dto';
import { Schema } from 'mongoose';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @UseGuards(ProtectedRouteGuard)
  @Get('me')
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains user data witch are not sensitive',
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
  async getMe(@Request() request: any) {
    return await this.UsersService.findUserById(request.user.id);
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Get('get-user-by-phone-number/:phoneNumber')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains user data witch are not sensitive',
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
    name: 'phoneNumber',
    required: true,
    description: 'this parameter must be a valid phone number',
  })
  async getUserByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return await this.UsersService.findUserByPhoneNumber(phoneNumber);
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Get('get-user-by-email/:email')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains user data witch are not sensitive',
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
    name: 'email',
    required: true,
    description: 'this parameter must be a valid email',
  })
  async getUserByEmail(@Param('email') email: string) {
    return await this.UsersService.findUserByEmail(email);
  }

  @UseGuards(ProtectedRouteGuard)
  @Patch('me')
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains user data witch are not sensitive',
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
  async updateMe(@Body() UpdateUserData: UpdateUserDto, @Request() request) {
    const data = await this.UsersService.updateMe(
      request.user.id,
      UpdateUserData,
    );

    return { message: 'user updated successfully', data };
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('owner')
  @Patch('role/:phoneNumber')
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiParam({
    name: 'user phoneNumber',
    required: true,
    description: 'this parameter must be a valid phoneNumber',
  })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains user data witch are not sensitive',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  async updateUserRole(
    @Param('phoneNumber') phoneNumber: string,
    @Body() body: updateUserRoleDto,
  ) {
    const data = await this.UsersService.updateUserRole(phoneNumber, body.role);

    return { message: `user role updated successfully to ${body.role}`, data };
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Get('all-users')
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains user data witch are not sensitive',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
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
  async getAllUsers(@Query() query: any) {
    return await this.UsersService.getAllUsers(query);
  }

  @Post('users-data')
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
    return await this.UsersService.getUsersData(timeFrameDto);
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Patch('banAndUnBanUser/:userId')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains user data witch are not sensitive',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  async banAndUnBanUser(@Param('userId') user: Schema.Types.ObjectId) {
    const data = await this.UsersService.banAndUnBanUser(user);

    const message = data.isBanned
      ? 'user is banned successfully'
      : 'user is unbanned successfully';

    return { message, data };
  }
}
