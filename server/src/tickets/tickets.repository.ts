import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Ticket, TicketDocument } from 'src/schemas/ticket/ticket.schema';
import { CreateTicketDto } from './dto/createTicket.dto';
import ApiFeatures from 'src/utilities/apis/apiFeatures';

@Injectable()
export class TicketRepository {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async createTicket(
    ticketData: CreateTicketDto,
    userId: Schema.Types.ObjectId,
  ) {
    const messages = [{ message: ticketData.message }];

    return await this.ticketModel.create({ messages, user: userId });
  }

  async responseToTicket(
    ticketData: CreateTicketDto,
    userId: Schema.Types.ObjectId | undefined,
    ticketId: Schema.Types.ObjectId,
  ) {
    const newMessage = { ...ticketData, admin: userId };

    return await this.ticketModel.updateOne(
      { _id: ticketId },
      {
        $push: { messages: newMessage },
        $set: { updatedAt: Date.now(), isActive: !userId },
      },
    );
  }

  async findTicketById(id: Schema.Types.ObjectId) {
    return await this.ticketModel
      .findById(id)
      .populate({ path: 'user', select: '_id role phoneNumber name email' })
      .populate({
        path: 'messages.admin',
        select: '_id role name',
      })
      .exec();
  }

  async findAllTickets(queryObj: any) {
    return await new ApiFeatures(
      this.ticketModel.find({ isActive: { $eq: true } }),
      queryObj,
    )
      .filter()
      .sort()
      .fields()
      .paginate()
      .getQuery();
  }

  async getAllUserTickets(user: Schema.Types.ObjectId) {
    return await this.ticketModel
      .find({ user })
      .select('-user -__v -updatedAt')
      .exec();
  }
}
