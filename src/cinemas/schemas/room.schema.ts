import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Seat, seatSchema } from "./seat.schema";
import { Cinema } from "./cinema.schema";

export type RoomDocument = HydratedDocument<Room>

console.log(Cinema);


@Schema({
  timestamps: true
})
export class Room {
  @Prop({ required: true })
  name: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  })
  cinema: mongoose.Types.ObjectId;

  @Prop({ required: true, type: [[seatSchema]] })
  seats: Seat[][];
}

export const roomSchema = SchemaFactory.createForClass(Room)