import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from '../schemas/movie.schema';
import { Model } from 'mongoose';
import { MovieFilter } from '../movies.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieRepository {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async findById(id: string): Promise<MovieDocument> {
    return await this.movieModel.findById(id);
  }

  async find(
    filter: MovieFilter,
    orderBy: Record<string, any>,
  ): Promise<MovieDocument[]> {
    return await this.movieModel
      .find(filter)
      .sort(orderBy)
      .select(['-seats'])
      .limit(filter.limit || 8)
      .skip((filter.limit || 8) * (+filter.page - 1))
      .exec();
  }

  async save(movie: Movie): Promise<MovieDocument> {
    const newMovie = new this.movieModel(movie);
    return newMovie.save();
  }
}
