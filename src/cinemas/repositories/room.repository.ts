import { InjectModel } from "@nestjs/mongoose";
import { Cinema, CinemaDocument } from "../schemas/cinema.schema";
import { Model } from "mongoose";
import { CreateCinemaDto } from "../dto/create-cinema.dto";
import { UpdateCinemaDto } from "../dto/update-cinema.dto";
import { Room, RoomDocument } from "../schemas/room.schema";

export class RoomRepository {
  constructor(@InjectModel(Room.name) private readonly roomModel: Model<Room>) {}

  async create(createCinemaDto: CreateCinemaDto): Promise<RoomDocument> {
    return await this.roomModel.create(createCinemaDto)
  }

  async findById(id: string): Promise<RoomDocument> {
    return await this.roomModel.findById(id)
  }

  async findByCinemaId(cinemaId: string): Promise<RoomDocument[]> {
    return await this.roomModel.find({ cinema: cinemaId })
  }

  async update(id: string, updateCinemaDto: UpdateCinemaDto): Promise<RoomDocument> {
    return await this.roomModel.findByIdAndUpdate(id, updateCinemaDto)
  }

  async delete(id: string): Promise<RoomDocument> {
    return await this.roomModel.findByIdAndDelete(id)
  }

}