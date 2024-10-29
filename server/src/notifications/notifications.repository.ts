import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from 'src/schemas/notification/notification.schema';
import { CreateNotificationDto } from './dto/createNotification.dto';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private readonly NotificationModel: Model<NotificationDocument>,
  ) {}

  async sendNotification(CreateNotificationDto: CreateNotificationDto) {
    return await this.NotificationModel.create(CreateNotificationDto);
  }

  async deleteNotification(notificationId: Schema.Types.ObjectId) {
    return await this.NotificationModel.findByIdAndDelete(
      notificationId,
    ).exec();
  }

  async getAllNotifications() {
    return await this.NotificationModel.find();
  }

  async getUserNotification(userId: Schema.Types.ObjectId) {
    return await this.NotificationModel.find({
      $or: [{ users: userId }, { 'users.0': 'all' }],
    })
      .sort('-createdAt -updatedAt')
      .select('_id message createdAt')
      .exec();
  }
}
