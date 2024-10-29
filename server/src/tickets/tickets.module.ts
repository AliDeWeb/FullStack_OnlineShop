import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from 'src/schemas/ticket/ticket.schema';
import { TicketRepository } from './tickets.repository';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    UsersModule,
    AuthModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService, TicketRepository],
})
export class TicketsModule {}
