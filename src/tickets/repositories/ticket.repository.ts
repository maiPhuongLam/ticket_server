import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from '../schemas/ticket.schema';
import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketRepository {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
  ) {}

  async findById(id: string): Promise<TicketDocument> {
    return await this.ticketModel.findById(id);
  }

  async findByUserId(userId: string): Promise<TicketDocument[]> {
    return await this.ticketModel.find({ user: userId });
  }

  async save(ticket: Ticket): Promise<TicketDocument> {
    const newMovie = new this.ticketModel(ticket);
    return newMovie.save();
  }
}
