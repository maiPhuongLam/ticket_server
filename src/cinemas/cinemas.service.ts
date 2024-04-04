import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { CinemaRepository } from './repositories/cinema.repository';
import { CinemaResponseDto } from './dto/cinema-response.dto';

@Injectable()
export class CinemasService {
  constructor(private readonly cinemaRepository: CinemaRepository) {}
  async create(createCinemaDto: CreateCinemaDto): Promise<CinemaResponseDto> {
    try {
      const cinema = await this.cinemaRepository.create(createCinemaDto)
      return CinemaResponseDto.plainToClass(cinema)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all cinemas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cinema`;
  }

  update(id: number, updateCinemaDto: UpdateCinemaDto) {
    return `This action updates a #${id} cinema`;
  }

  remove(id: number) {
    return `This action removes a #${id} cinema`;
  }
}
