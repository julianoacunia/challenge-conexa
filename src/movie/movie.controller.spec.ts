import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';

describe('MovieController', () => {
  let controller: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all movies', async () => {
    const result: Movie[] = [
      {
        id: 1,
        title: 'The Empire Strikes Back',
        director: 'Irvin Kershner',
        releaseYear: 1980,
        synopsis: '',
      },
      {
        id: 2,
        title: 'The Empire Strikes Back 2',
        director: 'Irvin Kershner',
        releaseYear: 1995,
        synopsis: '',
      },
    ];
    jest.spyOn(movieService, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should create a movie', async () => {
    const createMovieDto = {
      title: 'The Empire Strikes Back',
      director: 'Irvin Kershner',
      releaseYear: 1980,
      synopsis: '',
    };
    const result: Movie = { id: 1, ...createMovieDto };
    jest.spyOn(movieService, 'create').mockResolvedValue(result);

    expect(await controller.create(createMovieDto)).toBe(result);
  });

  it('should return one movie by id', async () => {
    const result: Movie = {
      id: 1,
      title: 'The Empire Strikes Back',
      director: 'Irvin Kershner',
      releaseYear: 1980,
      synopsis: '',
    };
    jest.spyOn(movieService, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(1)).toBe(result);
  });

  it('should update a movie', async () => {
    const updateMovieDto = {
      title: 'The Empire Strikes Back',
      director: 'Irvin Kershner',
      releaseYear: 1980,
      synopsis: '',
    };
    const result = { id: 1, ...updateMovieDto };
    jest.spyOn(movieService, 'update').mockResolvedValue(result);

    expect(await controller.update(1, updateMovieDto)).toBe(result);
  });

  it('should delete a movie', async () => {
    jest.spyOn(movieService, 'remove').mockResolvedValue(undefined);

    await expect(controller.remove(1)).resolves.toBeUndefined();
  });
});
