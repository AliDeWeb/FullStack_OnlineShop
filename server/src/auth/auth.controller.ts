import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ProtectedRouteGuard } from './guard/protectedRoute.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Schema } from 'mongoose';
import { changeRoleDto } from './dto/chageRole.dto';
import { PhoneNumberDto } from './dto/phoneNumber.dto';
import { GenerateTokenDto } from './dto/generateToken.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a message and a token',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 401,
    description: 'response contains a error message',
  })
  createUser(@Body() body: CreateUserDto) {
    return this.AuthService.createUser(body);
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains a message and a token',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 401,
    description: 'response contains a error message',
  })
  loginUser(@Body() body: LoginUserDto) {
    return this.AuthService.loginUser(body);
  }

  @Post('reset-password')
  @ApiBearerAuth()
  @UseGuards(ProtectedRouteGuard)
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a message and a token',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 404,
    description: 'response contains a error message',
  })
  async resetPassword(@Body() body: ResetPasswordDto, @Request() req: any) {
    const data = await this.AuthService.resetPassword(body, req.user.id);

    return { message: 'password changed successfully', data };
  }

  @Post('change-role/:id')
  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('owner')
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
    description: 'response contains a message and a token',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 404,
    description: 'response contains a error message',
  })
  @ApiParam({
    name: 'user id',
  })
  async changeRole(
    @Param('id') id: Schema.Types.ObjectId,
    @Body() changeRoleDto: changeRoleDto,
  ) {
    const data = await this.AuthService.changeRole(id, changeRoleDto.role);

    return {
      message: 'role updated successfully',
      data,
    };
  }

  @Post('generate-login-code')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a message and a token',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 404,
    description: 'response contains a error message',
  })
  async loginWithPhoneNumber(@Body() PhoneNumberDto: PhoneNumberDto) {
    await this.AuthService.loginWithPhoneNumber(PhoneNumberDto.phoneNumber);

    return {
      message: 'code sent successfully',
    };
  }

  @Post('generate-login-token')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a message and a token',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 404,
    description: 'response contains a error message',
  })
  async getTokenWithPhoneNumber(@Body() GenerateTokenDto: GenerateTokenDto) {
    return await this.AuthService.getTokenWithPhoneNumber(
      GenerateTokenDto.phoneNumber,
      GenerateTokenDto.code,
    );
  }
}
