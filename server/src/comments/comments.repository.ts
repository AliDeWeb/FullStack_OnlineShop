import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Schema } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment/comment.schema';
import { createCommentDto } from './dto/createComment.dto';
import ApiFeatures from '../utilities/apis/apiFeatures';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name)
    private readonly CommentModel: Model<CommentDocument>,
  ) {}

  async addNewComment(commentData: createCommentDto) {
    return await this.CommentModel.create(commentData);
  }

  async getAllComments(queryObj: any) {
    const query = new ApiFeatures(
      this.CommentModel.find().populate({
        path: 'product',
        select: '_id title images',
      }),
      queryObj,
    )
      .filter()
      .sort()
      .search()
      .paginate()
      .fields()
      .getQuery();

    return await query;
  }

  async acceptComment(commentId: Schema.Types.ObjectId) {
    return await this.CommentModel.findByIdAndUpdate(
      commentId,
      { isAccepted: true },
      { new: true },
    ).exec();
  }

  async responseToComment(
    commentId: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    response: string,
  ) {
    return await this.CommentModel.updateOne(
      { _id: commentId },
      {
        $push: { responses: { user, response } },
        $set: { updatedAt: Date.now() },
      },
    ).exec();
  }

  async findCommentById(commentId: Schema.Types.ObjectId) {
    return await this.CommentModel.findById(commentId).exec();
  }

  async findCommentsByFilter(filters: PipelineStage[]) {
    return await this.CommentModel.aggregate(filters).exec();
  }

  async deleteComment(commentId: Schema.Types.ObjectId) {
    return await this.CommentModel.findByIdAndDelete(commentId).exec();
  }
}
