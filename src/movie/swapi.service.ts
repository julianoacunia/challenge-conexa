/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { HttpService } from '@nestjs/axios'; // Importa HttpService

@Injectable()
export class SwapiService {
  constructor(
    private readonly movieService: MovieService,
    private readonly httpService: HttpService,
  ) {}

  async syncMovies(): Promise<void> {
    const { data } = (await this.httpService
      .get('https://swapi.dev/api/films/')
      .toPromise())!;
    
    console.log("DATA", data);
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
