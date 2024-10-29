import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { Schema } from 'mongoose';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import {
  userRolesEnum,
  userRolesType,
} from 'src/utilities/types/userRoles.type';
import { Smsir } from 'sms-typescript/lib';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  smsWebService!: any;

  constructor(
    private readonly AuthRepository: AuthRepository,
    private readonly UsersService: UsersService,
    private readonly JwtService: JwtService,
  ) {
    this.smsWebService = new Smsir(
      process.env.SMS_KEY,
      Number(process.env.SMS_LINE_NUMBER),
    );
  }

  async createUser(
    createUserData: CreateUserDto,
  ): Promise<{ message: string; token: string }> {
    try {
      const user = await this.AuthRepository.createUser(createUserData);

      const payload = {
        id: (user as any)._id,
        phoneNumber: user.phoneNumber,
      };

      const token = await this.JwtService.signAsync(payload);

      return {
        message: `welcome, you signed up successfully as ${user.phoneNumber}`,
        token,
      };
    } catch (err) {
      throw new UnauthorizedException('this user is already exist');
    }
  }

  async loginUser(loginUserData: LoginUserDto) {
    const isAnyUserExistWithThisPhoneNumber =
      await this.UsersService.findUserByPhoneNumber(loginUserData.phoneNumber);

    if (isAnyUserExistWithThisPhoneNumber?.isBanned)
      throw new ForbiddenException('you have already banned');

    const isPasswordCorrect = await bcrypt.compare(
      loginUserData.password,
      isAnyUserExistWithThisPhoneNumber.password,
    );

    if (!isPasswordCorrect)
      throw new UnauthorizedException('wrong phone number or password');

    const payload = {
      id: (isAnyUserExistWithThisPhoneNumber as any)._id,
      phoneNumber: isAnyUserExistWithThisPhoneNumber.phoneNumber,
    };

    const token = await this.JwtService.signAsync(payload);

    return {
      message: `welcome, you logged in successfully as ${isAnyUserExistWithThisPhoneNumber.phoneNumber}`,
      token,
    };
  }

  async resetPassword(
    ResetPasswordDto: ResetPasswordDto,
    userId: Schema.Types.ObjectId,
  ) {
    const isUserExist = await this.UsersService.findUserById(userId);

    if (!isUserExist) throw new NotFoundException('user is not found');

    const isPasswordCorrect = await bcrypt.compare(
      ResetPasswordDto.prevPassword,
      isUserExist.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('wrong prev password');
    }

    return await this.AuthRepository.resetPassword(ResetPasswordDto, userId);
  }

  async changeRole(id: Schema.Types.ObjectId, role: userRolesType) {
    if (!userRolesEnum.includes(role)) {
      throw new BadRequestException('role is not allowed');
    }

    const newAdmin = await this.AuthRepository.changeRole(id, role);

    if (!newAdmin) throw new NotFoundException('user is not found');

    return newAdmin;
  }

  async loginWithPhoneNumber(phoneNumber: string) {
    const user = await this.AuthRepository.findUserByPhoneNumber(phoneNumber);

    if (!user) throw new NotFoundException('user not found');

    const randomCode = _.random(100000, 999999);

    const now = new Date();

    const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);

    user.loginCode.code = randomCode;
    user.loginCode.expires = tenMinutesLater;
    await user.save();

    try {
      await this.smsWebService.SendVerifyCode(phoneNumber, 455971, [
        { name: 'CODE', value: randomCode },
      ]);
    } catch (err) {
      console.error(err);
    }
  }

  async getTokenWithPhoneNumber(phoneNumber: string, code: number) {
    const user = await this.UsersService.findUserByPhoneNumber(phoneNumber);

    if (!user) throw new NotFoundException('user not found');

    if (
      user.loginCode.code !== code ||
      new Date(user.loginCode.expires).getTime() < Date.now()
    )
      throw new BadRequestException('wrong phone number or code');

    const payload = {
      id: (user as any)._id,
      phoneNumber: user.phoneNumber,
    };

    const token = await this.JwtService.signAsync(payload);

    return {
      message: `welcome, you logged in successfully as ${user.phoneNumber}`,
      token,
    };
  }
}
