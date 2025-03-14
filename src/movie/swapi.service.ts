import { Injectable } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SwapiService {
  constructor(
    private readonly movieService: MovieService,
    private readonly httpService: HttpService,
  ) {}

  async syncMovies(): Promise<void> {
    const response = await this.httpService
      .get<{
        results: {
          title: string;
          director: string;
          release_date: string;
          opening_crawl: string;
        }[];
      }>('https://swapi.dev/api/films/')
      .toPromise();

    if (!response || !response.data) {
      throw new Error('Failed to fetch films from SWAPI');
    }

    const data = response.data;

    for (const film of data.results) {
      const movieDto: CreateMovieDto = {
        title: film.title,
        director: film.director,
        releaseYear: parseInt(film.release_date.split('-')[0]),
        synopsis: film.opening_crawl,
      };

      await this.movieService.create(movieDto);
    }
  }
}
