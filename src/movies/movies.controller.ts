import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MovieFilter, MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @UseGuards(RolesGuard)
  @Roles([UserRole.ADMIN])
  @Post('')
  async addMovie(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.createMovie(createMovieDto);
  }

  @Get('')
  async getMovies(@Query() filter: MovieFilter) {
    return this.moviesService.getMovies(filter);
  }

  @Get(':id')
  async getMovie(@Param('id') id: string) {
    return this.moviesService.getMovie(id);
  }
}
