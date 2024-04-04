import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Seat, SeatSchema } from './seat.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({
  timestamps: true,
})
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  genre: string[];

  @Prop({ required: true })
  timeStart: Date;

  @Prop({ required: true })
  timeEnd: Date;

  @Prop({ required: true, type: [[SeatSchema]] })
  seats: Seat[][];

  @Prop({ required: true })
  theater: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
