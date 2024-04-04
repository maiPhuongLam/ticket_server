import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from 'src/movies/schemas/movie.schema';
import { MovieRepository } from './repositories/movie.repository';
// import { AuthMiddleware } from 'src/shared/middlewares/auth.middleware';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    UsersModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRepository],
  exports: [MoviesService, MovieRepository],
})
export class MoviesModule {}
// export class MoviesModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude(
//         {
//           path: '/movies',
//           method: RequestMethod.GET,
//         },
//         {
//           path: '/movies/:id',
//           method: RequestMethod.GET,
//         },
//       )
//       .forRoutes(MoviesController);
//   }
// }
