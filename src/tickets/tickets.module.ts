import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { MoviesModule } from 'src/movies/movies.module';
import { TicketRepository } from './repositories/ticket.repository';
// import { AuthMiddleware } from 'src/shared/middlewares/auth.middleware';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    MoviesModule,
    UsersModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService, TicketRepository],
})
export class TicketsModule{}
// export class TicketsModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes(TicketsController);
//   }
//   use;
// }
