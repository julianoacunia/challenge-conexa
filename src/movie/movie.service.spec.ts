import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

describe('MovieService', () => {
  let service: MovieService;
  let repo: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repo = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('debería crear una película', async () => {
    const movieData = {
      title: 'Star Wars',
      director: 'Lucas',
      releaseYear: 1977,
      synopsis: '...',
    };
    const movie = new Movie();
    Object.assign(movie, movieData);

    jest.spyOn(repo, 'save').mockResolvedValue(movie);

    expect(await service.create(movieData)).toEqual(movie);
  });
});
