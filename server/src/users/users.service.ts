import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from 'src/schemas/user/user.schema';
import { Schema } from 'mongoose';
import { iranPhoneNumberValidator } from 'src/utilities/regex/phoneNumbersRegex';
import { emailValidator } from 'src/utilities/regex/emailRegex';
import {
  userRolesEnum,
  userRolesType,
} from 'src/utilities/types/userRoles.type';
import { timeFrameDto } from '../utilities/publicDto/timeFrame.dto';

@Injectable()
export class UsersService {
  constructor(private readonly UserRepository: UserRepository) {}

  async findUserById(id: Schema.Types.ObjectId): Promise<User | null> {
    const user = await this.UserRepository.findUserById(id);

    if (!user)
      throw new NotFoundException('there is no user with this information');

    return user;
  }

  async findUserByIdForAuth(id: Schema.Types.ObjectId): Promise<User | null> {
    const user = await this.UserRepository.findUserByIdForAuth(id);

    if (!user) {
      throw new BadRequestException('there is no user with this information');
    }

    return user;
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    if (!phoneNumber.match(iranPhoneNumberValidator))
      throw new BadRequestException('phone number is not valid');

    const user = await this.UserRepository.findUserByPhoneNumber(phoneNumber);

    if (!user) {
      throw new BadRequestException('there is no user with this phone number');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    if (!email.match(emailValidator))
      throw new BadRequestException('email is not valid');

    const user = await this.UserRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('there is no user with this email');
    }

    return user;
  }

  async updateMe(id: Schema.Types.ObjectId, attrs: Partial<User>) {
    const updatedUser = await this.UserRepository.updateUserById(id, attrs);

    if (!updatedUser) throw new BadRequestException('id is not valid');

    return updatedUser;
  }

  async updateUserRole(phoneNumber: string, role: userRolesType) {
    const newUserInfo = this.UserRepository.updateUserRole(phoneNumber, role);

    if (!userRolesEnum.includes(role))
      throw new BadRequestException(`${role} is not allowed`);

    if (!newUserInfo) throw new BadRequestException('id is not valid');

    return newUserInfo;
  }

  async getAllUsers(query: any) {
    return await this.UserRepository.getAllUsers(query);
  }

  async getUsersData(timeFrame: timeFrameDto) {
    return await this.UserRepository.getUsersByFilter([
      {
        $match: {
          $and: [
            { createdAt: { $gte: timeFrame.startTime } },
            { createdAt: { $lte: timeFrame.endTime } },
          ],
        },
      },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'user',
          as: 'orders',
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'user',
          as: 'comments',
        },
      },
      {
        $addFields: {
          ordersCount: { $size: '$orders' },
          commentsCount: { $size: '$comments' },
        },
      },
      {
        $unwind: {
          path: '$orders',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: '$createdAt' },
          users: { $sum: 1 },
          newCustomers: {
            $sum: {
              $cond: {
                if: { $gte: ['$ordersCount', 1] },
                then: 1,
                else: 0,
              },
            },
          },
          loyalCustomer: {
            $sum: {
              $cond: {
                if: { $gte: ['$ordersCount', 2] },
                then: 1,
                else: 0,
              },
            },
          },
          activeCustomer: {
            $sum: {
              $cond: {
                if: {
                  $or: [
                    { $gte: ['$ordersCount', 1] },
                    { $gte: ['$commentsCount', 1] },
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      {
        $addFields: {
          dayOfMonth: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          dayOfMonth: 1,
        },
      },
    ]);
  }

  async banAndUnBanUser(user: Schema.Types.ObjectId) {
    const updatedUser = await this.UserRepository.banAndUnBanUser(user);

    if (!updatedUser) throw new NotFoundException('user not found');

    return updatedUser;
  }

  async findOwnerAndAdminsAndUserPhoneNumbers(user: Schema.Types.ObjectId) {
    const result = await this.UserRepository.getUsersByFilter([
      {
        $match: { $or: [{ _id: user }, { role: { $in: ['owner', 'admin'] } }] },
      },
      {
        $group: {
          _id: null,
          users: {
            $push: { phoneNumber: '$phoneNumber', name: '$name' },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    return result[0].users;
  }
}
