import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketRepository } from './repositories/ticket.repository';
import { MoviesService } from 'src/movies/movies.service';
import { UserDocument } from 'src/users/schemas/user.schema';
import { TicketDocument } from './schemas/ticket.schema';
import { Seat, SeatStatus } from 'src/movies/schemas/seat.schema';
import mongoose from 'mongoose';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly movieService: MoviesService,
  ) {}
  async create(
    user: UserDocument,
    movieId: string,
    seats: string[],
  ): Promise<TicketDocument> {
    try {
      console.log(seats);
      
      if (!seats || !seats.length) {
        throw new BadRequestException('Seat numbers are required');
      }

      const movie = await this.movieService.getMovie(movieId);

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      for (const seatCurrent of seats) {
        console.log('seat:', movie.seats[3][1]);
        
        const seatIndex = this.findSeatIndex(movie.seats, seatCurrent);

        if (seatIndex === null) {
          throw new BadRequestException(`Seat ${seatCurrent} is invalid`);
        }

        const [seatIndexRow, seatIndexCol] = seatIndex;

        if (movie.seats[seatIndexRow][seatIndexCol].status === SeatStatus.BOOKED) {
          throw new BadRequestException(
            `Seat ${seatCurrent} is already booked`,
          );
        }

        movie.seats[seatIndexRow][seatIndexCol].status = SeatStatus.BOOKED
        const ticket = await this.ticketRepository.save({
          movie: movie._id,
          user: user._id,
          seat: movie.seats[seatIndexRow][seatIndexCol],
          bookingDate: new Date(),
        });
        await movie.save();
        return ticket;
      }
    } catch (error) {
      throw error;
    }
  }

  findSeatIndex(seats: Seat[][], seatNumber: string): [number, number] | null {
    for (let row = 0; row < seats.length; row++) {
      for (let col = 0; col < seats[row].length; col++) {
        if (seats[row][col] && seats[row][col].num === seatNumber) {
          return [row, col];
        }
      }
    }
    return null;
  }


  async findByUser(user: UserDocument): Promise<TicketDocument[]> {
    try {
      return await this.ticketRepository.findByUserId(user._id.toString());
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<TicketDocument> {
    try {
      const ticket = await this.ticketRepository.findById(id);

      if (!ticket) {
        throw new BadRequestException('Ticker not found');
      }
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
