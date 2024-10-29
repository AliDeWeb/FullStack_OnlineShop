import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createCommentDto } from './dto/createComment.dto';
import { CommentsRepository } from './comments.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { Schema } from 'mongoose';
import { OrdersService } from '../orders/orders.service';
import { timeFrameDto } from '../utilities/publicDto/timeFrame.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly CommentsRepository: CommentsRepository,
    private readonly ProductsRepository: ProductsRepository,
    private readonly OrdersService: OrdersService,
  ) {}

  async addNewComment(
    commentData: createCommentDto,
    user: Schema.Types.ObjectId,
  ) {
    const product = await this.ProductsRepository.findProductById(
      commentData.product,
    );

    if (!product) throw new NotFoundException('product id is not valid');

    const order = await this.OrdersService.findOrderByUserAndProduct(
      user,
      commentData.product,
    );

    const isBuyer = !!order;

    Object.assign(commentData, { user, isBuyer });

    return await this.CommentsRepository.addNewComment(commentData);
  }

  async getAllComments(queryObj: any) {
    return await this.CommentsRepository.getAllComments(queryObj);
  }

  async acceptComment(commentId: Schema.Types.ObjectId) {
    const product = await this.CommentsRepository.acceptComment(commentId);

    if (!product) throw new NotFoundException('product is not valid');

    return product;
  }

  async responseToComment(
    commentId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    response: string,
  ) {
    const comment = await this.findCommentById(commentId);

    const result = await this.CommentsRepository.responseToComment(
      commentId,
      userId,
      response,
    );

    if (!result) throw new BadRequestException('comment does not exist');

    comment.isAccepted = true;
    await comment.save();

    return result;
  }

  async findCommentById(commentId: Schema.Types.ObjectId) {
    const comment = await this.CommentsRepository.findCommentById(commentId);

    if (!comment) throw new NotFoundException('comment is not found');

    return comment;
  }

  async getCommentsData(timeFrame: timeFrameDto) {
    return await this.CommentsRepository.findCommentsByFilter([
      {
        $match: {
          $and: [
            { createdAt: { $gte: timeFrame.startTime } },
            { createdAt: { $lte: timeFrame.endTime } },
          ],
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: '$createdAt' },
          count: { $sum: 1 },
          ratesAverage: { $avg: '$rate' },
          countOfPositiveComments: {
            $sum: { $cond: [{ $gt: ['$rate', 3] }, 1, 0] },
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
    ]);
  }

  async deleteComment(commentId: Schema.Types.ObjectId) {
    const deletedComment =
      await this.CommentsRepository.deleteComment(commentId);

    if (!deletedComment) throw new NotFoundException('comment is not found');

    return deletedComment;
  }

  async getMyComments(user: Schema.Types.ObjectId) {
    return await this.getAllComments({ user });
  }
}
