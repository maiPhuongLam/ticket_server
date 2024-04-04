import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Room, roomSchema } from "./room.schema";

export type CinemaDocument = HydratedDocument<Cinema>

@Schema({
  timestamps: true
})
export class Cinema {
  @Prop({ required: true})
  name: string

  @Prop({ required: true})
  address: string

  @Prop({ required: true, type: [roomSchema], default: []})
  rooms: Room[]
}

export const cinemaSchema = SchemaFactory.createForClass(Cinema)
