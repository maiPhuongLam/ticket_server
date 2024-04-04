import { Module } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinema, cinemaSchema } from './schemas/cinema.schema';
import { Room, roomSchema } from './schemas/room.schema';
import { Seat, seatSchema } from './schemas/seat.schema';
import { CinemaRepository } from './repositories/cinema.repository';

@Module({
  imports: [MongooseModule.forFeature(
    [
      { name: Cinema.name, schema: cinemaSchema }, 
      { name: Room.name, schema: roomSchema },
      { name: Seat.name, schema: seatSchema },
    ])],
  controllers: [CinemasController],
  providers: [CinemasService, CinemaRepository],
})
export class CinemasModule {}
