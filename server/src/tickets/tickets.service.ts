import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TicketRepository } from './tickets.repository';
import { CreateTicketDto } from './dto/createTicket.dto';
import { Schema } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { userRolesType } from '../utilities/types/userRoles.type';

@Injectable()
export class TicketsService {
  constructor(
    private readonly TicketRepository: TicketRepository,
    private readonly UserService: UsersService,
  ) {}

  async createTicket(
    ticketData: CreateTicketDto,
    userId: Schema.Types.ObjectId,
  ) {
    const user = await this.UserService.findUserById(userId);

    if (!user)
      throw new BadRequestException('there is no user with this information');

    return await this.TicketRepository.createTicket(ticketData, userId);
  }

  async responseToTicket(
    ticketData: CreateTicketDto,
    userId: Schema.Types.ObjectId,
    ticketId: Schema.Types.ObjectId,
  ) {
    const user = await this.UserService.findUserById(userId);

    if (!user)
      throw new NotFoundException('there is no user with this information');

    const ticket = await this.TicketRepository.findTicketById(ticketId);

    if (!ticket || !((ticket.user as any)._id == userId))
      throw new NotFoundException('there is no ticket with this information');

    const isAdmin = user.role === 'admin' ? userId : undefined;

    return await this.TicketRepository.responseToTicket(
      ticketData,
      isAdmin,
      ticketId,
    );
  }

  async findTicketById(
    id: Schema.Types.ObjectId,
    userRole: userRolesType,
    userId: Schema.Types.ObjectId,
  ) {
    const ticket = await this.TicketRepository.findTicketById(id);

    if (!ticket)
      throw new NotFoundException('there is no ticket with with this id');

    if (userRole === 'admin') return ticket;

    if ((ticket.user as any)._id.toString() !== userId.toString())
      throw new NotFoundException('there is no user with this information');

    return ticket;
  }

  async findAllTickets(queryObj: any) {
    return await this.TicketRepository.findAllTickets(queryObj);
  }

  async getAllUserTickets(user: Schema.Types.ObjectId) {
    const tickets = await this.TicketRepository.getAllUserTickets(user);

    if (!tickets.length)
      throw new NotFoundException('user has not any tickets');

    return tickets;
  }
}
