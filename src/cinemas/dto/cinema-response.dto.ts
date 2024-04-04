import { Exclude } from "class-transformer";
import { Types } from "mongoose";
import { BaseDto } from "src/shared/dto/base.dto";
import { Room } from "../schemas/room.schema";

export class CinemaResponseDto extends BaseDto {
  __v: number;
  _id: Types.ObjectId;

  @Exclude()
  rooms: Room[]
}