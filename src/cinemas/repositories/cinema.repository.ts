import { InjectModel } from "@nestjs/mongoose";
import { Cinema, CinemaDocument } from "../schemas/cinema.schema";
import { Model } from "mongoose";
import { CreateCinemaDto } from "../dto/create-cinema.dto";
import { UpdateCinemaDto } from "../dto/update-cinema.dto";
import { CreateRoomDto } from "../dto/create-room.dto";

export class CinemaRepository {
  constructor(@InjectModel(Cinema.name) private readonly cinemaModel: Model<Cinema>) {}

  async create(createCinemaDto: CreateCinemaDto): Promise<CinemaDocument> {
    return await this.cinemaModel.create(createCinemaDto)
  }

  async findById(id: string): Promise<CinemaDocument> {
    return await this.cinemaModel.findById(id)
  }

  async find(): Promise<CinemaDocument[]> {
    return await this.cinemaModel.find()
  }

  async update(id: string, updateCinemaDto: UpdateCinemaDto): Promise<CinemaDocument> {
    return await this.cinemaModel.findByIdAndUpdate(id, updateCinemaDto)
  }

  async delete(id: string): Promise<CinemaDocument> {
    return await this.cinemaModel.findByIdAndDelete(id)
  }
}