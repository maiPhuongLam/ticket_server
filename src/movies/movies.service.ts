import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from './repositories/movie.repository';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Seat, SeatStatus, SeatType } from './schemas/seat.schema';
export type MovieFilter = {
  page: number;
  limit: number;
  title: string;
  director: string;
  genre: string[];
  sort: string;
  orderBy;
};

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<MovieDocument> {
    try {
      const {
        title,
        director,
        genre,
        timeStart,
        timeEnd,
        theater,
        rowNum,
        colNum,
        vipPrice,
        normalPrice,
        setVipSeats,
        setCancelSeats,
      } = createMovieDto;
      const seats: Seat[][] = [];
      for (let i = 0; i < rowNum; i++) {
        seats[i] = [];
        for (let j = 0; j < colNum; j++) {
          const rowChar = String.fromCharCode(65 + i);
          const isCancel = setCancelSeats.includes(`${rowChar}-${j + 1}`);
          const type = setVipSeats.includes(`${rowChar}-${j + 1}`)
              ? SeatType.VIP
              : SeatType.NORMAL;
          const price = type === SeatType.VIP ? vipPrice : normalPrice;
          let status
          if (isCancel) {
            status = SeatStatus.CANCEL
          } else {
            status = SeatStatus.EMPTY
          }
          seats[i][j] = { num: `${rowChar}-${j + 1}`, type, price, status };
        }
      }
      const movie = await this.movieRepository.save({
        title,
        director,
        genre,
        seats,
        theater,
        timeStart,
        timeEnd,
      } as Movie);
      return movie;
    } catch (error) {
      throw error;
    }
  }

  async getMovie(id: string): Promise<MovieDocument> {
    try {
      const movie = await this.movieRepository.findById(id);

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      return movie;
    } catch (error) {
      throw error;
    }
  }

  async getMovies(filter: MovieFilter): Promise<MovieDocument[]> {
    try {
      let orderBy;
      switch (filter.sort) {
        case 'timeAsc':
          orderBy = {
            timeStart: 'asc',
          };
          break;
        case 'timeEnd':
          orderBy = {
            timeStart: 'desc',
          };
          break;
        default:
          orderBy = {
            title: 'asc',
          };
          break;
      }
      return await this.movieRepository.find(filter, orderBy);
    } catch (error) {
      throw error;
    }
  }
}
