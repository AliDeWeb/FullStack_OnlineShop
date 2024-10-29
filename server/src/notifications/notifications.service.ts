import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from './notifications.repository';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { Schema } from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly NotificationRepository: NotificationRepository,
  ) {}

  async sendNotification(CreateNotificationDto: CreateNotificationDto) {
    return await this.NotificationRepository.sendNotification(
      CreateNotificationDto,
    );
  }

  async deleteNotification(notificationId: Schema.Types.ObjectId) {
    const deletedNotification =
      await this.NotificationRepository.deleteNotification(notificationId);

    if (!deletedNotification)
      throw new NotFoundException('the notification is not found');

    return deletedNotification;
  }

  async getUserNotification(userId: Schema.Types.ObjectId) {
    return await this.NotificationRepository.getUserNotification(userId);
  }

  async getAllNotifications() {
    return await this.NotificationRepository.getAllNotifications();
  }
}
