import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Movie } from 'src/movies/schemas/movie.schema';
import { Seat, SeatSchema } from 'src/movies/schemas/seat.schema';
import { User } from 'src/users/schemas/user.schema';

export type TicketDocument = HydratedDocument<Ticket>;
@Schema({
  timestamps: true,
})
export class Ticket {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Movie.name,
    required: true,
  })
  movie: mongoose.Types.ObjectId;

  @Prop({ required: true, type: SeatSchema })
  seat: Seat;

  @Prop({ default: Date.now() })
  bookingDate: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
